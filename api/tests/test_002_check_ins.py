from fastapi.testclient import TestClient
from queries.check_ins import Check_InQueries
from models import Check_inOutDetail, Check_inIn, AccountOut, Error
from authenticator import authenticator
from main import app
from typing import Union


client = TestClient(app)


def mock_survey_object(survey_id: int):
    return {
        "survey_id": survey_id,
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
        "q3_ans": 0,
        "q4": {
            "id": 4,
            "prompt": "Do you feel inspired?"
        },
        "q4_ans": 0,
        "q5": {
            "id": 5,
            "prompt": "Do you feel active?"
        },
        "q5_ans": 0
    }


def mock_rorschach_test(rorschach_id: int):
    return {
        "id": rorschach_id,
        "image": {
            "id": 1,
            "path": "https://b3447153.smushcdn.com/3447153/wp-content/uploads/2016/01/Rorschach_blot_01-300x196.jpg?lossy=1&strip=1&webp=1"
        },
        "response": "I see a moth"
    }


class MockCheckinQuery:
    def create(
            self,
            info: Check_inIn,
            account: dict
    ) -> Union[Check_inOutDetail, Error]:

        return Check_inOutDetail(
            check_in_id=1,
            account=AccountOut(**account),
            date=info.date,
            updated_date=info.updated_date,
            happy_level=info.happy_level,
            journal_entry=info.journal_entry,
            survey=mock_survey_object(survey_id=info.survey),
            rorschach_test=mock_rorschach_test(info.rorschach_test)
        )


def mock_get_current_account():
    return {
        "id": 1,
        "username": "string                                            ",
        "first_name": "string                                            ",
        "last_name": "string                                            ",
        "email": "string                                            "
    }


def test_create_check_ins():
    """
        test the create checkins
    """

    # Arrange (set up fake data)
    app.dependency_overrides[authenticator.get_current_account_data] = mock_get_current_account
    app.dependency_overrides[Check_InQueries] = MockCheckinQuery
    request_body = {
        "date": "2024-01-26T17:56:04.858Z",
        "updated_date": "2024-01-26T17:56:04.858Z",
        "happy_level": 1,
        "journal_entry": "writing",
        "survey": 1,
        "rorschach_test": 1
    }
    # Act
    response = client.post('/api/checkins', json=request_body)

    # Assert
    assert response.status_code == 200
    assert response.json() == {
        "check_in_id": 1,
        "account": {
            "id": 1,
            "username": "string                                            ",
            "first_name": "string                                            ",
            "last_name": "string                                            ",
            "email": "string                                            "
        },
        "date": "2024-01-26T17:56:04.858000+00:00",
        "updated_date": "2024-01-26T17:56:04.858000+00:00",
        "happy_level": 1,
        "journal_entry": "writing",
        "survey": {
            "survey_id": 1,
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
            "q3_ans": 0,
            "q4": {
            "id": 4,
            "prompt": "Do you feel inspired?"
            },
            "q4_ans": 0,
            "q5": {
            "id": 5,
            "prompt": "Do you feel active?"
            },
            "q5_ans": 0
        },
        "rorschach_test": {
            "id": 1,
            "image": {
            "id": 1,
            "path": "https://b3447153.smushcdn.com/3447153/wp-content/uploads/2016/01/Rorschach_blot_01-300x196.jpg?lossy=1&strip=1&webp=1"
            },
            "response": "I see a moth"
        }
    }
