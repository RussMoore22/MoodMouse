steps = [
    [
        # Create the check_ins table
        """
        CREATE TABLE check_ins (
        check_in_id SERIAL PRIMARY KEY NOT NULL,
        account INT NOT NULL,
        date TIMESTAMP NOT NULL,
        updated_date TIMESTAMP NOT NULL,
        happy_level INT NOT NULL,
        journal_entry TEXT,
        survey INT NOT NULL,
        rorschach_test INT NOT NULL,
        FOREIGN KEY (account) REFERENCES accounts(id),
        FOREIGN KEY (survey) REFERENCES surveys(survey_id),
        FOREIGN KEY (rorschach_test) REFERENCES rorschach_tests(rorschach_id)
        );
        """,
        # Drop the table
        """
        DROP TABLE check_ins;
        """,
    ]
]
