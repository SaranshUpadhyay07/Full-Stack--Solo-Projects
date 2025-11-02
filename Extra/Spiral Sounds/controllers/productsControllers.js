import { getDBConnection } from '../db/db.js'

export async function getGenres(req, res) {

  try {

    const db = await getDBConnection()

    const genreRows = await db.all('SELECT DISTINCT genre FROM products')
    const genres = genreRows.map(row => row.genre)
    res.json(genres)

  } catch (err) {

    res.status(500).json({error: 'Failed to fetch genres', details: err.message})

  }
}

export async function getProducts(req, res) {

  try {

    const db = await getDBConnection()
    const {genre,search} = req.query
    let query ='' 
    let params = []
    if(genre === undefined && search === undefined) query = 'SELECT * FROM products'
    if(genre !== undefined && search === undefined){
      query = 'SELECT * FROM products WHERE genre = ?'
      params.push(genre)
    }
    if(genre === undefined && search !== undefined){
      query = 'SELECT * FROM products WHERE artist LIKE ? OR title LIKE ? OR genre LIKE ?'
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    if(genre !== undefined && search !== undefined){
      query = 'SELECT * FROM products WHERE genre = ? AND (artist LIKE ? OR title LIKE ? )'
      const searchTerm = `%${search}%`;
      params.push(genre,searchTerm, searchTerm);
    }
    
    console.log(params)

    const dataAnswer = await db.all(query,params)
    res.json(dataAnswer)


  } catch (err) {

    res.status(500).json({error: 'Failed to fetch products', details: err.message})

  }

}