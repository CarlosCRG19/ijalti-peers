import ContactInfo from './ContactInfo';
import Generalnfo from './Generalnfo';
import ProfileInfo from './ProfileInfo';

const companySignupSteps = [
  {
    label: 'Información general',
    description: '¡Queremos conocer tu compañía!',
    Component: Generalnfo,
  },
  {
    label: 'Información de contacto',
    description: '¡Dinos cómo contactarte!',
    Component: ContactInfo,
  },
  {
    label: 'Perfil público',
    description: '¡Casi terminamos!',
    Component: ProfileInfo,
  },
];

export default companySignupSteps;
