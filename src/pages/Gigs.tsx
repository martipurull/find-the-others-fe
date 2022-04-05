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
import { chooseIcon } from '../hooks/useUtils'


export default function Gigs() {
    const navigate = useNavigate()
    const { axiosRequest } = useAxios()
    const loggedUser = useSelector((state: IInitialState) => state.user.currentUser)
    const [allGigs, setAllGigs] = useState<IGig[]>([])
    const [gigsToDisplay, setGigsToDisplay] = useState<IGig[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500)
    const [totalDocs, setTotalDocs] = useState<number>(0)
    const [docsPerPage, setDocsPerPage] = useState<number>(5)
    const [currentPage, setCurrentPage] = useState(1)



    const hasUserApplied = (gigId: string) => {
        if (!loggedUser) return false
        const userApplicationIds = loggedUser.applications.map(({ _id }) => _id)
        return userApplicationIds.includes(gigId)
    }

    const handleChangePage = (e: ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page)
    }

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
                <Grid item xs={12} md={6} sx={{ textAlign: 'center', minHeight: '75vh' }}>
                    <Typography component='h1' variant='h3' sx={{ mt: 2, fontWeight: 'bold' }}>Find collaboration opportunities</Typography>

                    <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <Grid item xs={9}>
                            <FormControl variant='standard' fullWidth>
                                <InputLabel htmlFor='gig-search-field'>Search for gigs</InputLabel>
                                <Input id='gig-search-field' startAdornment={<InputAdornment position='start'><SearchIcon /></InputAdornment>} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={9}>
                            <List sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                {
                                    gigsToDisplay.map(gig => (
                                        <Box key={gig._id} sx={{ borderBottom: '1px solid #f5faff', mb: 2, bgcolor: 'rgba(0,0,0,0.6)' }}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar sx={{ width: 50, height: 50, mr: 2 }}>
                                                        <Box component='img' src={chooseIcon(gig.instrument)} sx={{ maxWidth: 40, objectFit: 'cover' }} />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={`WANTED: ${gig.instrument} for ${gig.title.toLowerCase()}.`} secondary={`Expected duration: ${gig.hours}${gig.hours > 1 ? ` hours` : ` hour`}`} />
                                                <GigApplication hasApplied={hasUserApplied(gig._id)} gigId={gig._id} />
                                            </ListItem>
                                        </Box>
                                    ))
                                }
                                {
                                    totalDocs > docsPerPage &&
                                    <Pagination sx={{ alignSelf: 'center' }} page={currentPage} count={Math.ceil(totalDocs / docsPerPage)} onChange={handleChangePage} shape="rounded" boundaryCount={10} />
                                }
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
