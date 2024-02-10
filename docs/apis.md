
# Api Design

## Auth
(Authorization)

**Method**: `"GET", "POST", "DELETE"`
**Path**: `'/api/token`, `/api/accounts`, /api/login', '/api/create'


### Get a authentication token
output:

```
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": 0,
    "username": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string"
  }
}


```

### Create an authentication token

output:

```
{
  "access_token": "someREALLYLONGstringwith123s",
  "token_type": "Bearer"
}
```

### Create a new user

input:

```
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "username": "string",
  "password": "string"
}


```

output:
```
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": 0,
    "username": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string"
  }
}


```

## Default
(Check-ins)

**Method**: `"GET", "POST", "PUT", "DELETE"`
**Path**: ` '/api/checkins', '/api/checkins/mine', '/api/checkins/{check_in_id}',`


### Create a checkin
input:

```
{
  "happy_level": 0,
  "journal_entry": "string",
  "survey": 0,
  "rorschach_test": 0
}


```

output:

```
{
  "check_in_id": 0,
  "account": {
    "id": 0,
    "username": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string"
  },
  "date": "2024-02-09T22:02:36.719Z",
  "updated_date": "2024-02-09T22:02:36.719Z",
  "happy_level": 0,
  "journal_entry": "string",
  "survey": {
    "survey_id": 0,
    "q1": {
      "id": 0,
      "prompt": "string"
    },
    "q1_ans": 0,
    "q2": {
      "id": 0,
      "prompt": "string"
    },
    "q2_ans": 0,
    "q3": {
      "id": 0,
      "prompt": "string"
    },
    "q3_ans": 0,
    "q4": {
      "id": 0,
      "prompt": "string"
    },
    "q4_ans": 0,
    "q5": {
      "id": 0,
      "prompt": "string"
    },
    "q5_ans": 0
  },
  "rorschach_test": {
    "id": 0,
    "image": {
      "id": 0,
      "path": "string"
    },
    "response": "string"
  }
}
```

### update a checkin

input:

```
{
  "happy_level": 0,
  "journal_entry": "string",
  "survey": 0,
  "rorschach_test": 0
}

```


output:


```
{
  "check_in_id": 0,
  "account": {
    "id": 0,
    "username": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string"
  },
  "date": "2024-02-09T22:05:29.840Z",
  "updated_date": "2024-02-09T22:05:29.840Z",
  "happy_level": 0,
  "journal_entry": "string",
  "survey": {
    "survey_id": 0,
    "q1": {
      "id": 0,
      "prompt": "string"
    },
    "q1_ans": 0,
    "q2": {
      "id": 0,
      "prompt": "string"
    },
    "q2_ans": 0,
    "q3": {
      "id": 0,
      "prompt": "string"
    },
    "q3_ans": 0,
    "q4": {
      "id": 0,
      "prompt": "string"
    },
    "q4_ans": 0,
    "q5": {
      "id": 0,
      "prompt": "string"
    },
    "q5_ans": 0
  },
  "rorschach_test": {
    "id": 0,
    "image": {
      "id": 0,
      "path": "string"
    },
    "response": "string"
  }
}

```

### Delete a checkin


output when deleted:
'''
true
'''


## Rorschach
(Rorschach Test and images)

**Method**: `"GET, "POST", "PUT",`
**Path**: `'/api/rorschach_imgs, '/api/rorschach_tests', '/api/rorschach_tests/{rorschach_id}'`

rorschach image output:

```
[
  {
    "id": 0,
    "path": "string"
  }
]


```
### Get a Rorschach Image
rorschach test input:

```
{
  "image": 0,
  "response": "string"
}

```

### Get a Rorschach test out

rorschach test output:

```

{
  "id": 0,
  "image": {
    "id": 0,
    "path": "string"
  },
  "response": "string"
}

```

### Update a Rorschach test

update rorschach test input:

```
{
  "id": 0,
  "image": {
    "id": 0,
    "path": "string"
  },
  "response": "string"
}

```

update rorschach test output:


```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```





## Survey
(Survey test and questions)

**Method**: `"GET", "POST", "PUT`
**Path**: `'/api/questions/{question_id}, '/api/surveys', '/api/surveys/{survey_id}'`


### Get one survey question


output:

```

{
  "id": 0,
  "prompt": "string"
}
```

### Create a survey

input:

```
{
  "q1": 1,
  "q1_ans": 0,
  "q2": 2,
  "q2_ans": 0,
  "q3": 3,
  "q3_ans": 0,
  "q4": 4,
  "q4_ans": 0,
  "q5": 5,
  "q5_ans": 0
}

```

output:

```

{
  "survey_id": 0,
  "q1": {
    "id": 0,
    "prompt": "string"
  },
  "q1_ans": 0,
  "q2": {
    "id": 0,
    "prompt": "string"
  },
  "q2_ans": 0,
  "q3": {
    "id": 0,
    "prompt": "string"
  },
  "q3_ans": 0,
  "q4": {
    "id": 0,
    "prompt": "string"
  },
  "q4_ans": 0,
  "q5": {
    "id": 0,
    "prompt": "string"
  },
  "q5_ans": 0
}


```
