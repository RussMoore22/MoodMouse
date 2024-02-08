steps = [
    [
        # Create the surveys table
        """
        CREATE TABLE surveys (
        survey_id SERIAL PRIMARY KEY NOT NULL,
        q1 INT NOT NULL,
        q1_ans INT NOT NULL,
        q2 INT NOT NULL,
        q2_ans INT NOT NULL,
        q3 INT NOT NULL,
        q3_ans INT NOT NULL,
        q4 INT NOT NULL,
        q4_ans INT NOT NULL,
        q5 INT NOT NULL,
        q5_ans INT NOT NULL,
        FOREIGN KEY (q1) References questions(id),
        FOREIGN KEY (q2) References questions(id),
        FOREIGN KEY (q3) References questions(id),
        FOREIGN KEY (q4) References questions(id),
        FOREIGN KEY (q5) References questions(id)
        );
        """,
        # Drop the table
        """
        DROP TABLE surveys;
        """,
    ]
]
