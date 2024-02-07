from fastapi.testclient import TestClient
from queries.check_ins import Check_InQueries
from models import Check_inOutDetail, AccountOut, Error
from authenticator import authenticator
from main import app
from typing import Union

client = TestClient(app)

class MockCheckinQueries:
    def get_one_check_in(
            self,
            check_in_id: int,
            account: dict) -> Union[Check_inOutDetail, Error]:

        data = Check_inOutDetail(
            check_in_id=check_in_id,
            account=mock_get_current_account(),
            date="2024-02-07T17:00:25.738Z",
            updated_date="2024-02-07T17:00:25.738Z",
            happy_level=2,
            journal_entry="I am learning today!",
            survey=mock_survey_object(),
            rorschach_test=mock_rorschach_test()
        )
        print(data)

def mock_get_current_account():
    '''
    We are using this to get fake account data
    '''
    return {
        "id":1,
        "username":"TestUser",
        "first_name":"Mr.",
        "last_name":"Testing",
        "email":"someone@aol.com"
    }


def mock_survey_object(survey_id, int):
    return {
        "survey_id": 1, # survey_id,
        "q1": {
            "id": 1,
            "prompt": "Do you feel safe today?"
        },
        "q1_ans": 0,
        "q2": {
            "id": 2,
            "prompt": "Do you feel rested?"
        },
        "q2_ans": 0,
        "q3": {
            "id": 3,
            "prompt": "Do you feel loved by others?"
        },
        "q3_ans": 2,
        "q4": {
            "id": 4,
            "prompt": "Do you feel inspired?"
        },
        "q4_ans": 3,
        "q5": {
            "id": 5,
            "prompt": "Do you feel active?"
        },
        "q5_ans": 4
    }

def mock_rorschach_test(rorschach_id: int):
    return {
        "id": 1,
        "image": {
            "id": 1,
            "path": "https://b3447153.smushcdn.com/3447153/wp-content/uploads/2016/01/Rorschach_blot_01-300x196.jpg?lossy=1&strip=1&webp=1"
        },
        "response": "I see a rib cage"
    }


def test_get_one_checkin():
    # Arrange
    app.dependency_overrides[authenticator.get_account_getter] = mock_get_current_account
    app.dependency_overrides[Check_InQueries] = MockCheckinQueries
    check_in_id = 1


    # Act
    response = client.get(f"/api/checkin/{check_in_id}")

    # Assert
    assert response.status_code == 200
    assert response.json == {
  "check_in_id": 0,
  "account": {
        "id":1,
        "username":"TestUser",
        "first_name":"Mr.",
        "last_name":"Testing",
        "email":"someone@aol.com"
    },
  "date": "2024-02-07T17:00:25.738Z",
  "updated_date": "2024-02-07T17:00:25.738Z",
  "happy_level": 2,
  "journal_entry": "I am learning today!",
  "survey": {
        "survey_id": 1, # survey_id,
        "q1": {
            "id": 1,
            "prompt": "Do you feel safe today?"
        },
        "q1_ans": 0,
        "q2": {
            "id": 2,
            "prompt": "Do you feel rested?"
        },
        "q2_ans": 0,
        "q3": {
            "id": 3,
            "prompt": "Do you feel loved by others?"
        },
        "q3_ans": 2,
        "q4": {
            "id": 4,
            "prompt": "Do you feel inspired?"
        },
        "q4_ans": 3,
        "q5": {
            "id": 5,
            "prompt": "Do you feel active?"
        },
        "q5_ans": 4
    },
  "rorschach_test": {
        "id": 1,
        "image": {
            "id": 1,
            "path": "https://b3447153.smushcdn.com/3447153/wp-content/uploads/2016/01/Rorschach_blot_01-300x196.jpg?lossy=1&strip=1&webp=1"
        },
        "response": "I see a rib cage"
    }
}


# Reset dependency overrides and goes back to original state
app.dependency_overrides = {}
