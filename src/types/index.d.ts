interface IInitialState {
    user: IReduxStoreUser,
    userProjects: IReduxStoreProjects
}

interface IReduxStoreUser {
    isLoggedIn: boolean
    currentUser: IUser | null
}

interface IReduxStoreProjects {
    projects: IProject[]
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
    musicianOrFan: string
}

interface IEditDetails {
    firstName: string
    lastName: string
    username: string
    email: string
    musicianOrFan: string
}

interface IMiniUser {
    _id: string
    firstName: string
    lastName: string
    avatar: string
    connections?: string[]
}

interface IUser {
    _id: string
    firstName: string
    lastName: string
    email: string
    password: string
    username: string
    musicianOrFan: string
    refreshJWT: string
    facebookId: string
    googleId: string
    avatar: string
    filename: string
    memberOf: IMiniBand[]
    bandOffers: string[]
    projects: IMiniProject[]
    connections: IMiniUser[]
    connectionsSent: IMiniUser[]
    connectionsReceived: IMiniUser[]
    applications: IAppliedGig[]
    followedBands: string[]
    createdAt: date
    updatedAt: date
}


interface IPost {
    sender: {
        avatar: string
        firstName: string
        lastName: string
        _id: string
        memberOf: string[]
    }
    isForProject: boolean
    postProject: IProject
    text: string
    image?: string
    filename?: string
    likes: string[]
    comments?: IComment[]
    createdAt: date
    updatedAt: date
    noOfPostLikes: number
    _id: string
}

export interface IComment {
    sender: {
        firstName: string
        lastName: string
        avatar: string
    }
    text: string
    likes: string[]
    _id: string
}

interface IProject {
    _id: string
    title: string
    projectAdmins: string[]
    members: IMiniUser[]
    description: string
    projectImage?: string
    filename?: string
    dueDate: date
    trackToDate?: {
        audiofile: string
        filename: string
    }
    trackCover?: {
        image: string
        filename: string
    }
    bands: IMiniBand[]
    projectPosts?: IPost[]
    tasks?: ITask[]
    isActive: boolean
    taskIds: string[]
}

interface IProjectDetails {
    title: string
    projectAdmins: string[]
    members: string[]
    bands: string[]
    description: string
    dueDate: date
    bands: IMiniBand[]
}

interface IMiniProject {
    _id: string,
    title: string,
    projectImage?: string
    members: [{ firstName: string, lastName: string }]
    bands: IMiniBand[]
}

interface ITask {
    _id: string
    status: string
    musicians: IUser[]
    title: string
    description: string
    audioFile: string
    filename: string
    notes?: INote[]
}

interface IGig {
    _id?: string
    title: string
    project?: IMiniProject
    bands?: IMiniBand[]
    description: string
    genre: string
    hours: number
    instrument: string
    otherInstrument?: string
    specifics?: string
    applications?: IApplication[]
    isGigAvailable: boolean
}

interface IAppliedGig {
    _id: string
    title: string
    project: {
        _id: string
        title: string
    }
    description: string
    instrument: string
    genre: string
}

interface INote {
    sender: IUser
    text: string
}

interface IApplication {
    applicantId: IMiniUser
    submission: {
        audioFile: string
        filename: string
        notes: string
    }
}

interface IBand {
    _id: string
    name: string
    bandAdmins: IUser[]
    members: IMiniUser[]
    invitationsSent?: IMiniUser[]
    readyTracks?: ITrack[]
    releasedTracks?: ITrack[]
    projects?: IMiniProject[]
    blurb: string
    bio: string
    avatar: string
    filename: string
    followedBy?: string[]
    noOfFollowers: number
}

interface IBandDetails {
    name: string
    bandAdmins: string[]
    members: string[]
    blurb: string
    bio: string
}

interface IMiniBand {
    name: string
    avatar: string
    followedBy: string[]
    noOfFollowers: number
    _id: string
}

interface ITrack {
    audiofile: string
    filename: string
}

interface ICover {
    image: string
    filename: string
}

interface ITrackToSend {
    track: {
        audiofile: string
        filename: string
    }
    cover: {
        image: string
        filename: string
    }
}