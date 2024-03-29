from fastapi.testclient import TestClient
from queries.check_ins import CheckInQueries
from models import Check_inOutDetail
from authenticator import authenticator
from main import app

client = TestClient(app)


class MockCheckinQueries:
    def get_one_check_in(
        self, check_in_id: int, account: dict
    ) -> Check_inOutDetail:

        return Check_inOutDetail(
            check_in_id=check_in_id,
            account=mock_get_current_account(),
            date="2024-02-06T15:17:56.366463",
            updated_date="2024-03-06T15:17:56.366463",
            happy_level=2,
            journal_entry="I am learning today!",
            survey=mock_survey_object(),
            rorschach_test=mock_rorschach_test(),
        )


def mock_get_current_account():
    """
    We are using this to get fake account data
    """
    return {
        "id": 1,
        "username": "TestUser",
        "first_name": "Mr.",
        "last_name": "Testing",
        "email": "someone@aol.com",
    }


def mock_survey_object():
    return {
        "survey_id": 1,
        "q1": {"id": 1, "prompt": "Do you feel safe today?"},
        "q1_ans": 0,
        "q2": {"id": 2, "prompt": "Do you feel rested?"},
        "q2_ans": 0,
        "q3": {"id": 3, "prompt": "Do you feel loved by others?"},
        "q3_ans": 2,
        "q4": {"id": 4, "prompt": "Do you feel inspired?"},
        "q4_ans": 3,
        "q5": {"id": 5, "prompt": "Do you feel active?"},
        "q5_ans": 4,
    }


def mock_rorschach_test():
    return {
        "id": 1,
        "image": {
            "id": 1,
            "path": "google.com",
        },
        "response": "I see a rib cage",
    }


def test_get_one_checkin():
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = (
        mock_get_current_account
    )
    app.dependency_overrides[CheckInQueries] = MockCheckinQueries
    check_in_id = 1

    # Act
    response = client.get(f"/api/check-ins/{check_in_id}")

    # Assert
    assert response.status_code == 200
    assert response.json() == {
        "check_in_id": 1,
        "account": {
            "id": 1,
            "username": "TestUser",
            "first_name": "Mr.",
            "last_name": "Testing",
            "email": "someone@aol.com",
        },
        "date": "2024-02-06T15:17:56.366463",
        "updated_date": "2024-03-06T15:17:56.366463",
        "happy_level": 2,
        "journal_entry": "I am learning today!",
        "survey": {
            "survey_id": 1,
            "q1": {"id": 1, "prompt": "Do you feel safe today?"},
            "q1_ans": 0,
            "q2": {"id": 2, "prompt": "Do you feel rested?"},
            "q2_ans": 0,
            "q3": {"id": 3, "prompt": "Do you feel loved by others?"},
            "q3_ans": 2,
            "q4": {"id": 4, "prompt": "Do you feel inspired?"},
            "q4_ans": 3,
            "q5": {"id": 5, "prompt": "Do you feel active?"},
            "q5_ans": 4,
        },
        "rorschach_test": {
            "id": 1,
            "image": {
                "id": 1,
                "path": "google.com",
            },
            "response": "I see a rib cage",
        },
    }

    # Reset dependency overrides and goes back to original state
    app.dependency_overrides = {}
