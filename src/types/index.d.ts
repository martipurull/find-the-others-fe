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
    currentProject: IProject | null
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
    projectAdminIds: string[]
    memberIds: string[]
    bandIds: string[]
    description: string
    dueDate?: date
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
    musicians: IMiniUser[]
    title: string
    description?: string
    audioFile?: string
    filename?: string
    notes?: INote[]
    status?: string
}

interface ITaskDetails {
    title: string
    musicians: string[]
    description?: string
    status: string
}

interface IGig {
    _id: string
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
    noOfApplications: number
}

interface IGigDetails {
    title: string
    projectId?: string
    bandIds?: string[]
    description: string
    genre: string
    hours: number
    instrument: string
    otherInstrument?: string
    specifics?: string
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
    _id: string
    sender: IMiniUser
    text: string
}

interface IApplication {
    _id: string
    applicant: IMiniUser
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
    readyTracks?: ITrackToSend[]
    releasedTracks?: ITrackToSend[]
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
    bandAdminIds: string[]
    memberIds: string[]
    blurb: string
    bio: string
}

interface IMiniBand {
    name: string
    avatar: string
    followedBy?: string[]
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
    _id?: string
    trackName: string
    track: {
        audiofile: string
        filename: string
    }
    cover: {
        image: string
        filename: string
    }
}