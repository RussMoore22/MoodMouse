# Data models

#### questions
| name    | type         | unique   | optional |
| :---:   | :----:       | :----:   | :----:   |
| prompt  | varchar(300) | yes      | no       |

The questions entity contains the data used in the surveys given to the user daily.

#### surveys
| name   | type                   | unique | optional |
| :---:  | :----:                 | :----: | :----:   |
| q1     | reference to questions | yes    | no       |
| q1_ans | int                    | yes    | no       |
| q2     | reference to questions | yes    | no       |
| q2_ans | int                    | yes    | no       |
| q3     | reference to questions | yes    | no       |
| q3_ans | int                    | yes    | no       |
| q4     | reference to questions | yes    | no       |
| q4_ans | int                    | yes    | no       |
| q5     | reference to questions | yes    | no       |
| q5_ans | int                    | yes    | no       |

The survey entity is given to a user daily when they create a checkin

#### rorschach_imgs
| name   | type           | unique   | optional |
| :---:  | :----:         | :----:   | :----:   |
| path   | varchar(300)   | no       | no       |

The rorschach_img entity provides a path to an image that the user
will respond to when completing a rorschach_test

#### rorschach_tests
| name     | type                          | unique   | optional |
| :---:    | :----:                        | :----:   | :----:   |
| image    | reference to rorschach_imgs   | no       | no       |
| response | varchar(500).                 | no       | yes      |

The rorschach_test entity is given to a user daily when they create a checkin

#### check_ins
| name           | type                       | unique | optional |
| :---:          | :----:                     | :----: | :----:   |
| account        | references accounts        | no     | no       |
| date           | timestamp                  | no     | no       |
| updated_date   | timestamp                  | no     | no       |
| happy_level    | int                        | no     | no       |
| journal_entry  | text                       | no     | yes      |
| survey         | references surveys         | no     | no       |
| rorschach_test | references rorschach_tests | no     | no       |

The check_in entity is the core data of the application and stores daily data from a user.

#### accounts
| name               | type           | unique   | optional |
| :---:              | :----:         | :----:   | :----:   |
| first_name         | char(50)       | no       | no       |
| last_name          | char(50)       | no       | no       |
| username           | char(50)       | yes      | no       |
| email              | char(50)       | yes      | no       |
| hashed_password    | varchar(300)   | no       | no       |
