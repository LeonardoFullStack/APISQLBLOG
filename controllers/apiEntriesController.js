const express = require('express');

const { updateByIdConnect,
    getEntriesByEmail,
    createEntriesByEmail,
    getAllEntriesConnect,
    deleteEntriesByEmail,
    updateEntriesById,
    getAllEntriesByPageConnect,
    getOneConnect,
    deleteByIdConnect,
    showCategories,
    showEntriesByCategoryConnect

} = require('../models/entries')

const { getAuthByEmail,
    getEmailByName
} = require('../models/author');

const { getRepliesByIdModel } = require('../models/replies')


const getEntries = async (req, res) => {
    let data, msg, ok, userExists
    let { email, pag } = req.query
    


    try {
        
        if (email) {

            console.log('mail')
            data = await getEntriesByEmail(email)
            if (data.length == 0) {
                ok = true;
                msg = 'El usuario no tiene entradas'
            } else {
                msg = `entradas del usuario ${email}`
            }

        } else if (pag) {
            console.log('pagina')
            data = await getAllEntriesByPage(pag)
            console.log(data)
            ok = true
            msg = 'Todas las entradas'
        } else {
            console.log('predata')
            data = await getAllEntries(1)
            console.log('postdata')
            ok = true
            msg = 'Todas las entradas'

        }
        res.status(200).json({
            ok: true,
            msg,
            data
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacta con el administrador',
            error
        })
    }


}

const getMyEntries = async (req, res) => {
    let email = await getEmailByName(req.body.name)

    try {
        const data = await getEntriesByEmail(email)

        res.status(200).json({
            ok: true,
            data
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
        })
    }

}

const getAllEntries = async (pag) => {
    let data;


    try {

        data = await getAllEntriesConnect()



    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacta con el administrador'
        })
    }
    return data
}

const getAllEntriesByPage = async (pag) => {
    let data;
    const page = (pag - 1) * 4

    try {

        data = await getAllEntriesByPageConnect(page)



    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacta con el administrador'
        })
    }
    return data
}

const createEntries = async (req, res) => {
    const { title, content, name, category, extract, entryImage } = req.body
    const email = await getEmailByName(name)
    let userExists = await getAuthByEmail(email)
    let entries = await getEntriesByEmail(email)
    let titleExists = entries.filter(entry => entry.title == title)

    if (userExists.ok) {

        if (titleExists.length == 0) {

            try {
                const data = await createEntriesByEmail(title, content, email, category, entryImage, extract);

                res.status(200).json({
                    ok: true,
                    msg: 'entrada creada',
                    data: {
                        title,
                        content,
                        email,
                        category,
                        extract,
                        entryImage
                    }
                })
            } catch (error) {
                res.status(500).json({
                    ok: false,
                    msg: 'error al crear la entrada'
                })
            }
        } else {
            res.status(500).json({
                ok: false,
                msg: 'Ya existe una entrada con ese título y ese autor'
            })
        }
    } else {
        res.status(404).json({
            ok: false,
            msg: 'El usuario con ese email no existe'
        })
    }


}

const createEntriesV2 = async (req, res) => {
    const { title, content, name, category, extract, entryImage } = req.body

    try {
        const email = await getEmailByName(name)
        let userExists = await getAuthByEmail(email)
        let entries = await getEntriesByEmail(email)
        let titleExists = entries.filter(entry => entry.title == title)

        if (userExists.ok) {
            if (titleExists.length == 0) {
                const data = await createEntriesByEmail(title, content, email, category, entryImage, extract);

                res.status(200).json({
                    ok: true,
                    msg: 'entrada creada',
                    data: {
                        title,
                        content,
                        email,
                        category,
                        extract,
                        entryImage
                    }
                })
            } else {
                res.status(500).json({
                    ok: false,
                    msg: 'Ya existe una entrada con ese título y ese autor'
                })
            }
        } else {
            res.status(404).json({
                ok: false,
                msg: 'El usuario con ese email no existe'
            })
        }

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Contacta con el administrador',
            error
        })
    }
}

const entriesProof = async (req,res) => {
    console.log(req)
}

const getCategories = async (req, res) => {
    const category = req.query.q

    if (category) {
        try {
            const entriesByCategory = await showEntriesByCategoryConnect(category)

            if (entriesByCategory.length == 0) {
                res.status(400).json({
                    ok:false,
                    msg:`No se han encontrado entradas con la categoría ${category}`
                    
                })
            } else {
                res.status(200).json({
                    ok:true,
                    category,
                    entriesByCategory
                    
                })
            }
            
           
        } catch (error) {
            res.status(400).json({
                ok: false,
                msg: 'Contacta con el administrador',
                error
            })
        }
    } else {

        try {
            const categories = await showCategories();
            
            if (categories.length > 4) {
                categories.splice(4)
            }

            res.status(200).json({
             ok:true,
             msg:'Todas las categorías con su número de entradas correspondientes',
             categories
            }) 
        } catch (error) {
            res.status(400).json({
                ok:false,
                error
            })
        }
        
    }

}



const deleteEntries = async (req, res) => {
    const { email } = req.body
    const { title } = req.params
    let userExists = await getAuthByEmail(email)
    let titleExists = await getEntriesByEmail(email)
    let sameEntry = titleExists.filter(object => object.title.includes(title))

    if (userExists.ok && sameEntry.length != 0) {
        try {
            const data = await deleteEntriesByEmail(title, email)

            res.status(200).json({
                ok: true,
                msg: 'entrada borrada',
                data: {
                    title,
                    email
                }
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'error al borrar la entrada'
            })
        }
    } else {
        res.status(404).json({
            ok: false,
            msg: 'El email del usuario o la entrada no existe en nuestra base de datos'
        })
    }


}


const updateEntries = async (req, res) => {
    const { email, title, content, category, entryImage, extract } = req.body
    const oldTitle = req.params.title

    let titleExists = await getAllEntries()
    let sameEntry = titleExists.filter(object => object.title.includes(oldTitle))

    if (sameEntry.length != 0) {

        try {
            const data = await updateEntriesById(email, oldTitle, title, content, category, entryImage, extract)

            res.status(200).json({
                ok: true,
                msg: 'entrada actualizada',
                data: {
                    title,
                    content,
                    category,
                    extract,
                    entryImage
                }
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'error al actualizar'
            })
        }
    } else {
        res.status(404).json({
            ok: false,
            msg: 'No se ha encontrado el usuario o la entrada'
        })
    }
}

const getOneEntry = async (req, res) => {
    let data, msg, ok, userExists
    let id = req.params.id


    try {
        const data = await getOneConnect(id)
        const replies = await getRepliesByIdModel(id)

        if (data.length == 0) {
            res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado la entrada'
            })
        } else {
            res.status(200).json({
                ok: true,
                msg: 'Se ha encontrado la entrada',
                data,
                replies
            })
        }


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacta con el administrador'
        })
    }
}

const deleteById = async (req, res) => {
    const { id } = req.params

    try {
        const entryExist = await getOneConnect(id)
        if (entryExist.length == 0) {
            res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado la entrada'
            })
        } else {
            const delById = deleteByIdConnect(id)
            res.status(200).json({
                ok: true,
                msg: 'Se ha eliminado la entrada'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de conexión'
        })
    }
}

const updateById = async (req, res) => {
    const id = req.params.id
    const { title, content, category, entryImage, extract } = req.body
    const body = { id, ...req.body }

    try {
        const data = updateByIdConnect(title, content, category, entryImage, extract, id)
        res.status(200).json({
            ok: true,
            msg: 'Se ha actualizado la entrada',
            data: body
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        })
    }
}

const getSearch = async (req,res) => {
    let search = req.params.search.toLowerCase()


    try {

    const data = await getAllEntries(1)
    let dataSearch = []
    const title = item.title.toLowerCase();
    const name = item.name.toLowerCase();
    const content = item.content.toLowerCase();
    const extract = item.extract.toLowerCase();
    const category = item.category.toLowerCase();
    
    data.forEach(item =>{
       
        if (title.includes(search) || name.includes(search) || content.includes(search)|| extract.includes(search) || category.includes(search)) {
         dataSearch.push(item)
        }
    })

    if (dataSearch.length == 0) {
        res.status(200).json({
            ok:true,
            msg:'No se han encontrado entradas con ésta búsqueda'
        })
    } else {
        res.status(200).json({
            ok:true,
            msg:`Se han encontrado ${dataSearch.length} entrada/s`,
            data: dataSearch
        })
    }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        })
    }

    
}

module.exports = {
    getEntries,
    createEntries,
    deleteEntries,
    updateEntries,
    getOneEntry,
    deleteById,
    updateById,
    getMyEntries,
    createEntriesV2,
    entriesProof,
    getCategories,
    getSearch
}

