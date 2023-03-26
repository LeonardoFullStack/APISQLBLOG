const queries={
    getEntriesByEmail:`
    SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
    FROM entries AS e
    INNER JOIN authors AS a
    ON e.id_author=a.id_author
    WHERE a.email=$1
    ORDER BY e.title;`,
    getAllEntries:`SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
                    FROM entries AS e
                    INNER JOIN authors AS a
                    ON e.id_author=a.id_author
                    ORDER BY e.title;`,
    createEntries: `INSERT INTO entries(title,content,id_author,category)
                    VALUES
                    ($1, $2, (SELECT id_author FROM authors WHERE email=$3),$4)`,
    deleteEntry:`DELETE FROM entries
                 WHERE title=$1 AND (SELECT id_author FROM authors WHERE email=$2)=id_author`,
    updateEntry:`UPDATE entries
                 SET title =$3 , content=$4 , category=$5
                 WHERE title=$2 AND (SELECT id_author FROM authors WHERE email=$1)=id_author
                 `,
    getAut: `SELECT *
             FROM authors
             WHERE email=$1`,
    getAllAuts:`SELECT *
                FROM authors
                ORDER BY authors.name`,
    createAut: `INSERT INTO authors(name,surname,email,image)
                VALUES
                ($1, $2, $3, $4)`,
    deleteAut:`DELETE FROM authors
               WHERE email=$1`,
    updateAut:`UPDATE authors
                SET name =$2 , surname=$3 , email=$4, image=$5
                WHERE email=$1`

}

module.exports=queries