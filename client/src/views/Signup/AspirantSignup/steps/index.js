import PersonalData from './PersonalData';
import ProfessionalExperience from './ProfessionalExperience';
import PublicProfile from './PublicProfile';

const aspirantSignupSteps = [
  {
    label: 'Datos Personales',
    description: '¡Queremos conocerte más!',
    Component: PersonalData,
  },
  {
    label: 'Experiencia Profesional',
    description: '¡Cuéntanos tu trayectoria!',
    Component: ProfessionalExperience,
  },
  {
    label: 'Perfil Público',
    description: '¡Casi terminamos!',
    Component: PublicProfile,
  },
];

export default aspirantSignupSteps;
