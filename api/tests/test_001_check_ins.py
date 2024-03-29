from fastapi.testclient import TestClient
from queries.check_ins import CheckInQueries
from models import Check_inOutDetail, Check_inIn, AccountOut
from authenticator import authenticator
from main import app

client = TestClient(app)


def mock_get_current_account():
    return {
        "id": 1,
        "username": "Lheadrick01",
        "first_name": "Lola",
        "last_name": "Headrick",
        "email": "lola@gmail.com",
    }


def mock_survey_object(survey_id: int):
    return {
        "survey_id": survey_id,
        "q1": {"id": 1, "prompt": "Do you feel safe today?"},
        "q1_ans": 0,
        "q2": {"id": 2, "prompt": "Do you feel rested?"},
        "q2_ans": 0,
        "q3": {"id": 3, "prompt": "Do you feel loved by others?"},
        "q3_ans": 0,
        "q4": {"id": 4, "prompt": "Do you feel inspired?"},
        "q4_ans": 0,
        "q5": {"id": 5, "prompt": "Do you feel active?"},
        "q5_ans": 0,
    }


def mock_rorschach_test(rorschach_id: int):
    return {
        "id": rorschach_id,
        "image": {
            "id": 1,
            "path": "google.com",
        },
        "response": "string",
    }


class MockCheckinQueries:
    def update_checkin(
        self, check_in_id: int, check_in: Check_inIn, account: dict
    ):
        return Check_inOutDetail(
            check_in_id=check_in_id,
            account=AccountOut(**account),
            date="2023-01-26T19:40:53.141000+00:00",
            updated_date="2024-01-26T19:40:53.141000+00:00",
            happy_level=check_in.happy_level,
            journal_entry=check_in.journal_entry,
            survey=mock_survey_object(check_in.survey),
            # Need to work on accessing rorschach
            rorschach_test=mock_rorschach_test(check_in.rorschach_test),
        )


def test_update_checkin():

    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = (
        mock_get_current_account
    )
    app.dependency_overrides[CheckInQueries] = MockCheckinQueries
    check_in_id = 1
    check_in = {
        "happy_level": 4,
        "journal_entry": "This is a test",
        "survey": 2,
        "rorschach_test": 2,
    }

    # Act
    response = client.put(f"/api/check-ins/{check_in_id}", json=check_in)

    # Assert
    assert response.status_code == 200
    assert response.json() == {
        "check_in_id": 1,
        "account": {
            "id": 1,
            "username": "Lheadrick01",
            "first_name": "Lola",
            "last_name": "Headrick",
            "email": "lola@gmail.com",
        },
        "date": "2023-01-26T19:40:53.141000+00:00",
        "updated_date": "2024-01-26T19:40:53.141000+00:00",
        "happy_level": 4,
        "journal_entry": "This is a test",
        "survey": {
            "survey_id": 2,
            "q1": {"id": 1, "prompt": "Do you feel safe today?"},
            "q1_ans": 0,
            "q2": {"id": 2, "prompt": "Do you feel rested?"},
            "q2_ans": 0,
            "q3": {"id": 3, "prompt": "Do you feel loved by others?"},
            "q3_ans": 0,
            "q4": {"id": 4, "prompt": "Do you feel inspired?"},
            "q4_ans": 0,
            "q5": {"id": 5, "prompt": "Do you feel active?"},
            "q5_ans": 0,
        },
        "rorschach_test": {
            "id": 2,
            "image": {
                "id": 1,
                "path": "google.com",
            },
            "response": "string",
        },
    }


# clean up
app.dependency_overrides = {}
