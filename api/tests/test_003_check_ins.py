from fastapi.testclient import TestClient
from models import Check_inOutList
from queries.check_ins import Check_InQueries
from authenticator import authenticator
from main import app


client = TestClient(app)


def mock_get_current_account():
    """
    fake account data
    """
    return {
        "id": 1,
        "username": "string",
        "first_name": "string",
        "last_name": "string",
        "email": "string"
    }


def mock_survey_object():
    return [
        {
            "survey_id": 1,
            "q1": {
                "id": 1,
                "prompt": "Do you feel safe today?"
            },
            "q1_ans": 1,
            "q2": {
                "id": 2,
                "prompt": "Do you feel rested?"
            },
            "q2_ans": 2,
            "q3": {
                "id": 3,
                "prompt": "Do you feel loved by others?"
            },
            "q3_ans": 3,
            "q4": {
                "id": 4,
                "prompt": "Do you feel inspired?"
            },
            "q4_ans": 4,
            "q5": {
                "id": 5,
                "prompt": "Do you feel active?"
            },
            "q5_ans": 5
        },
        {
            "survey_id": 2,
            "q1": {
                "id": 1,
                "prompt": "Do you feel safe today?"
            },
            "q1_ans": 5,
            "q2": {
                "id": 2,
                "prompt": "Do you feel rested?"
            },
            "q2_ans": 4,
            "q3": {
                "id": 3,
                "prompt": "Do you feel loved by others?"
            },
            "q3_ans": 3,
            "q4": {
                "id": 4,
                "prompt": "Do you feel inspired?"
            },
            "q4_ans": 2,
            "q5": {
                "id": 5,
                "prompt": "Do you feel active?"
            },
            "q5_ans": 1
        }
    ]


def mock_rorschach_tests():
    return [
        {
            "id": 1,
            "image": {
                "id": 1,
                "path": "https://b3447153.smushcdn.com/3447153/wp-content/uploads/2016/01/Rorschach_blot_01-300x196.jpg?lossy=1&strip=1&webp=1"
            },
            "response": "I see a bear fighting"
        },
        {
            "id": 2,
            "image": {
                "id": 2,
                "path": "https://example.com/image2.jpg"
            },
            "response": "I see a castle"
        }
    ]


class MockCheckinQueries:
    """
    mock list of checkins
    """
    def get_all_mine(
            self,
            account: dict) -> Check_inOutList:
        current_account = mock_get_current_account()
        survey = mock_survey_object()
        rorschach_test = mock_rorschach_tests()
        return [
            Check_inOutList(
                check_in_id=1,
                account=current_account["id"],
                date="2024-01-26T17:56:04.858Z",
                updated_date="2024-01-26T17:56:04.858Z",
                happy_level=1,
                journal_entry="I am happy today.",
                survey=survey[0],
                rorschach_test=rorschach_test[0]
            ),
            Check_inOutList(
                check_in_id=2,
                account=current_account["id"],
                date="2024-01-26T17:56:04.858Z",
                updated_date="2024-03-26T17:56:04.858Z",
                happy_level=4,
                journal_entry="I am sad today.",
                survey=survey[1],
                rorschach_test=rorschach_test[1]
            )
        ]


def test_get_all_mine():
    """
    test get_all checkins
    """
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = mock_get_current_account
    app.dependency_overrides[Check_InQueries] = MockCheckinQueries
    # Act
    response = client.get('/api/checkins/mine')

    # Assert to make sure its status code is 200
    assert response.status_code == 200

    # This ensures the response contains the correct number of check-ins
    checkins = response.json()
    assert len(checkins) == 2

    # Assert the structure of each check-in object is present
    for checkin in checkins:
        assert "check_in_id" in checkin
        assert "account" in checkin
        assert "date" in checkin
        assert "updated_date" in checkin
        assert "happy_level" in checkin
        assert "journal_entry" in checkin
        assert "survey" in checkin
        assert "rorschach_test" in checkin

        # Assert the structure of the survey object is present
        survey = checkin["survey"]
        assert "survey_id" in survey
        assert "q1" in survey
        assert "q1_ans" in survey
        assert "q2" in survey
        assert "q2_ans" in survey
        assert "q3" in survey
        assert "q3_ans" in survey
        assert "q4" in survey
        assert "q4_ans" in survey
        assert "q5" in survey
        assert "q5_ans" in survey

        # Assert the structure of the rorschach_test object is present
        rorschach_test = checkin["rorschach_test"]
        assert "id" in rorschach_test
        assert "image" in rorschach_test
        assert "response" in rorschach_test

# This resets any dependency overrides and reverts the fastapi endpoint to its
# original state.
    app.dependency_overrides = {}
