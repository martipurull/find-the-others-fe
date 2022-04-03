import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import { useNavigate } from 'react-router'
import GigApplication from '../components/GigApplication'
import { useDebounce } from 'use-debounce'
import useAxios from '../hooks/useAxios'
import { ChangeEvent, useEffect, useState } from 'react'
import { IGig, IInitialState } from '../types'
import { useSelector } from 'react-redux'


export default function Gigs() {
    const navigate = useNavigate()
    const { axiosRequest } = useAxios()
    const loggedUser = useSelector((state: IInitialState) => state.user.currentUser)
    const [allGigs, setAllGigs] = useState<IGig[]>([])
    const [gigsToDisplay, setGigsToDisplay] = useState<IGig[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500)
    // const [filteredGigs, setFilteredGigs] = useState<IGig[]>([])
    const [totalDocs, setTotalDocs] = useState(0)
    const [docsPerPage, setDocsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const hasUserApplied = (gigId: string) => {
        if (!loggedUser) return false
        const userApplicationIds = loggedUser?.applications.map(({ _id }) => _id)
        return userApplicationIds.includes(gigId)
    }

    const handleChangePage = (e: ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page)
    }

    // const filterGigs = () => {
    //     const gigIncludesInstrument = allGigs.filter(({ instrument }) => instrument.includes(debouncedSearchTerm))
    //     const gigIncludesOtherInstrument = allGigs.filter(({ otherInstrument }) => otherInstrument?.includes(debouncedSearchTerm))
    //     const gigIncludesSpecifics = allGigs.filter(({ specifics }) => specifics?.includes(debouncedSearchTerm))
    //     const gigIncludesBand = allGigs.filter(({ bands }) => bands?.map(({ name }) => name.includes(debouncedSearchTerm)))
    //     const gigIncludesDescription = allGigs.filter(({ description }) => description.includes(debouncedSearchTerm))
    //     const combinedArray = [...gigIncludesInstrument, ...gigIncludesOtherInstrument, ...gigIncludesSpecifics, ...gigIncludesBand, ...gigIncludesDescription]
    //     setFilteredGigs(combinedArray)
    // }

    // const fetchAllGigs = async () => {
    //     const response = await axiosRequest(`/gigs/`, 'GET')
    //     setAllGigs(response.data.gigs)
    //     setTotalDocs(response.data.noOfGigsInDb)
    // }
    // useEffect(() => {
    //     filterGigs()
    // }, [debouncedSearchTerm])

    const fetchPageGigs = async () => {
        const response = await axiosRequest(`/gigs?limit=${docsPerPage}&page=${currentPage}&search=${debouncedSearchTerm}`, 'GET')
        setTotalDocs(response.data.noOfGigsInDb)
        setGigsToDisplay(response.data.gigs)
    }

    useEffect(() => {
        fetchPageGigs()
    }, [docsPerPage, currentPage, debouncedSearchTerm])

    return (
        <Container maxWidth="xl" sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                    <Typography component='h1' variant='h3' sx={{ mt: 3 }}>Find collaboration opportunities</Typography>

                    <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <Grid item xs={9}>
                            <FormControl variant='standard' fullWidth>
                                <InputLabel htmlFor='gig-search-field'>Search for gigs</InputLabel>
                                <Input id='gig-search-field' startAdornment={<InputAdornment position='start'><SearchIcon /></InputAdornment>} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={9}>
                            <List sx={{ width: '100%' }}>
                                {
                                    gigsToDisplay.map(gig => (
                                        <Box key={gig._id} sx={{ borderBottom: '1px solid #f5faff', mb: 2, bgcolor: 'rgba(0,0,0,0.6)' }}>
                                            <ListItem>
                                                {/* FIND BETTER ICONS FOR INSTRUMENTS AND CREATE FUNCTION TO CHOOSE THE RIGHT ONE */}
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <MusicNoteOutlinedIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={`WANTED: ${gig.instrument} for ${gig.title.toLowerCase()}.`} secondary={`Expected duration: ${gig.hours}${gig.hours > 1 ? ` hours` : ` hour`}`} />
                                                <GigApplication hasApplied={hasUserApplied(gig._id)} />
                                            </ListItem>
                                        </Box>
                                    ))
                                }
                                <Pagination page={currentPage} count={totalDocs / docsPerPage} onChange={handleChangePage} shape="rounded" boundaryCount={10} />
                            </List>
                            <Typography component='h3' variant='h6' sx={{ mt: 3 }}>Looking for musicians for your own project?</Typography>
                            <Button color='primary' size='large' variant='contained' sx={{ mt: 3, mb: 3 }} onClick={() => navigate('/new-gig')}>OFFER A GIG</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
