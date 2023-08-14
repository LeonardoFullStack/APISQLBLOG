const queries={
    getEntriesByEmail:`
    SELECT e.title,e.content,e.date,e.category, e.extract,e.entryImage,e.id_entry,a.name,a.surname
    FROM entries AS e
    INNER JOIN authors AS a
    ON e.id_author=a.id_author
    WHERE a.email=$1
    ORDER BY e.date DESC;`,
    getAllEntriesByPage:`SELECT e.title,e.content,e.date,e.category,e.authavatar, e.extract,e.entryImage,e.id_entry,e.replies,a.name,a.surname
                         FROM entries AS e
                         INNER JOIN authors AS a
                         ON e.id_author=a.id_author
                         ORDER BY e.id_entry DESC
                         LIMIT 4
                         OFFSET $1`,
    getAllEntries: `SELECT *
                    FROM entries AS e
                    INNER JOIN authors AS a
                    ON e.id_author=a.id_author`,
    createEntries: `INSERT INTO entries(title,content,id_author,category,entryImage,extract,authavatar)
                    VALUES
                    ($1, $2, (SELECT id_author FROM authors WHERE email=$3),$4,$5,$6,(SELECT avatar FROM authors WHERE email=$3))`,
    deleteEntry:`DELETE FROM entries
                 WHERE title=$1 AND (SELECT id_author FROM authors WHERE email=$2)=id_author`,
    updateEntry:`UPDATE entries
                 SET title =$3 , content=$4 , category=$5, entryImage=$6, extract=$7
                 WHERE title=$2 AND (SELECT id_author FROM authors WHERE email=$1)=id_author
                 `,
    getAut: `SELECT *
             FROM authors
             WHERE email=$1`,
    getAutByName: `SELECT *
                   FROM authors
                   WHERE name=$1`,
    getAllAuts:`SELECT *
                FROM authors
                ORDER BY authors.name`,
    createAut: `INSERT INTO authors(name,surname,email,password,avatar)
                VALUES
                ($1, $2, $3, $4, $5)`,
    deleteAut:`DELETE FROM authors
               WHERE email=$1`,
    updateAut:`UPDATE authors
               SET name =$2 , surname=$3 , email=$4, image=$5, password=$6
               WHERE email=$1`,
    getOneEntry:`SELECT *, a.id_author
                 FROM entries AS e
                 INNER JOIN authors AS a
                 ON e.id_author=a.id_author
                 WHERE e.id_entry=$1`,
    deleteEntryById: `DELETE FROM entries
                      WHERE id_entry=$1`,
    updateEntryById:`UPDATE entries
                     SET title =$2 , content=$3 , category=$4, entryImage=$5, extract=$6
                     WHERE id_entry=$1`,
    getAllRepliesFromAEntry:`SELECT * FROM replies
                             WHERE id_entry=$1
                             ORDER BY date DESC`,
    createReplyFromEntryId: `INSERT INTO replies(id_entry,name,has_image,image,content,avatar)
                            VALUES
                            ((SELECT id_entry FROM entries WHERE id_entry=$1),$2,$3,$4,$5,(SELECT avatar FROM authors WHERE name = $2))`,
    addReplyInteger:`UPDATE entries
                     SET replies = replies + 1
                     WHERE id_entry = $1`,
    deleteReplyByIdQuery:`DELETE FROM replies
                          WHERE id_reply=$1`

}

module.exports=queries