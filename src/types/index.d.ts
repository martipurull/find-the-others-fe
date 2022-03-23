interface IInitialState {
    user: IReduxStoreUser
}

interface IReduxStoreUser {
    isLoggedIn: boolean
    currentUser: IUser | null
}

interface IUserCredentials {
    email: string
    password: string
}

interface IUserDetails extends IUserCredentials {
    confirmPassword: string
    firstName: string
    lastName: string
    username: string
}

interface IUser {
    _id: string
    firstName: string
    lastName: string
    email: string
    password: string
    username: string
    isMusician: boolean
    refreshJWT: string
    facebookId: string
    googleId: string
    avatar: string
    filename: string
    memberOf: IBand[]
    bandOffers: string[]
    projects: IProject[]
    connections: string[]
    connectionsSent: string[]
    connectionsReceived: string[]
    applications: IApplication[]
    followedBands: string[]
    createdAt: date
    updatedAt: date
}

interface IPost {
    sender: IUser
    isForProject: boolean
    postProject: IProject
    text: string
    image?: string
    filename?: string
    likes: IUser[]
    comments?: IComment[]
}

export interface IComment {
    sender: IUser
    text: string
    likes: IUser[]
}

interface IProject {
    _id: string
    title: string
    leader: string
    members: IUser[]
    description: string
    dueDate: date
    trackToDate: {
        audiofile: string
        filename: string
    }
    trackCover: {
        image: string
        filename: string
    }
    filename: string
    bands: IBand[]
    projectPosts: IPost[]
    tasks: ITask[]
    isActive: boolean
}

interface ITask {
    status: string
    musicians: IUser[]
    title: string
    description: string
    audioFile: string
    filename: string
    notes?: INote[]
}

interface IGig {
    title: string
    postedBy: IUser
    project: IProject
    bands: IBand[]
    description: string
    genre: string
    hours: number
    instrument: string
    specifics: string
    applications: IApplication[]
    isGigAvailable: boolean
}

interface INote {
    sender: IUser
    text: string
}

interface IApplication {
    applicant: IUser
    submission: {
        audioFile: string
        filename: string
        notes: string
    }
}

interface IBand {
    name: string
    bandAdmins: IUser[]
    members: IUser[]
    invitationsSent: IUser[]
    readyTracks: ITrack[]
    releasedTracks: ITrack[]
    projects: IProject[]
    blurb: string
    bio: string
    avatar: string
    filename: string
    followedBy: IUser[]
}

interface ITrack {
    track: {
        audiofile: string
        filename: string
    }
    cover: {
        image: string
        filename: string
    }
}