// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

export const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig =  (user) => {
  return [
    {
      title: 'meetings',
      path: '/dashboard/meeting',
      icon: icon('ic_meeting'),
    },
    {
      title: 'messenger',
      path: '/dashboard/messenger',
      icon: icon('ic_messenger'),
    },
    {
      title: 'training',
      path: '/dashboard/training',
      icon: icon('ic_training'),
    },
    {
      title: 'nutrition',
      path: '/dashboard/nutrition',
      icon: icon('ic_nutrition'),
    },
    {
      title: 'profile',
      path: '/dashboard/profile',
      icon: icon('ic_profile'),
    },
  ];
}

export default navConfig;
