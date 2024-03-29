import styles from '../styles/Home.module.css'
import { DataStore } from 'aws-amplify'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Movie } from '../src/models'


import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { PostAddSharp } from '@mui/icons-material'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];


const getRows = () => {
  const [Movie, setMovie] = useState([])
  useEffect(() => {
    fetchMovie()
    async function fetchMovie() {
      const MovieData = await DataStore.query(Movie)
      setMovie(MovieData)
    }
    DataStore.observe(Movie).subscribe(() => fetchMovie())
  }, [])

}
// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function DataGridDemo() {
  const [Movie, setMovie] = useState([])
  useEffect(() => {
    fetchMovie()
    async function fetchMovie() {
      const MovieData = await DataStore.query(Movie)
      setMovie(MovieData)
    }
    DataStore.observe(Movie).subscribe(() => fetchMovie())
  }, [])

  return (
    <div className={styles.grid}>
    {Movie?.map((Movie) => {
      return (
        <a href="#" className={styles.card}>
          <h3>{Movie.title}</h3>
        </a>
      )
    })}
  </div>
  );
}
