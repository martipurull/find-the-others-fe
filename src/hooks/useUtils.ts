import bassIcon from '../assets/icons/bassIcon.svg'
import brassIcon from '../assets/icons/brassIcon.svg'
import drumsIcon from '../assets/icons/drumsIcon.svg'
import guitarIcon from '../assets/icons/guitarIcon.svg'
import keysIcon from '../assets/icons/keysIcon.svg'
import masteringIcon from '../assets/icons/masteringIcon.svg'
import mixingIcon from '../assets/icons/mixingIcon.svg'
import percIcon from '../assets/icons/percIcon.svg'
import stringsIcon from '../assets/icons/stringsIcon.svg'
import vocalsIcon from '../assets/icons/vocalsIcon.svg'
import windIcon from '../assets/icons/windIcon.svg'

export const chooseIcon = (gigInst: string) => {
    if (gigInst === 'bass') return bassIcon
    if (gigInst === 'brass') return brassIcon
    if (gigInst === 'drums') return drumsIcon
    if (gigInst === 'guitar') return guitarIcon
    if (gigInst === 'keys') return keysIcon
    if (gigInst === 'keys') return keysIcon
    if (gigInst === 'mastering') return masteringIcon
    if (gigInst === 'mixing') return mixingIcon
    if (gigInst === 'percussion') return percIcon
    if (gigInst === 'strings') return stringsIcon
    if (gigInst === 'vocals') return vocalsIcon
    if (gigInst === 'wind') return windIcon
}