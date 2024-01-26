steps = [
    [
        """
        INSERT INTO rorschach_imgs
        (path)
        VALUES
        ('https://b3447153.smushcdn.com/3447153/wp-content/uploads/2016/01/Rorschach_blot_01-300x196.jpg?lossy=1&strip=1&webp=1'),
        ('https://b3447153.smushcdn.com/3447153/wp-content/uploads/2016/01/Rorschach_blot_02-300x214.jpg?lossy=1&strip=1&webp=1'),
        ('https://b3447153.smushcdn.com/3447153/wp-content/uploads/2016/01/800px-Rorschach_blot_03-300x206.jpg?lossy=1&strip=1&webp=1'),
        ('https://b3447153.smushcdn.com/3447153/wp-content/uploads/2016/01/Rorschach_blot_04-300x203.jpg?lossy=1&strip=1&webp=1'),
        ('https://b3447153.smushcdn.com/3447153/wp-content/uploads/2016/01/Rorschach_blot_05-300x219.jpg?lossy=1&strip=1&webp=1');
        """,
        """
        DROP TABLE rorschach_imgs;
        """
    ]
]
