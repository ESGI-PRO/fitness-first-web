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
      title: user?.isTrainer ? 'my trainees' : 'my trainer',
      path: `/dashboard/${user?.isTrainer ? 'my_trainees' : 'my_trainer'}`,
      icon:  user?.isTrainer ? icon('ic_users') : icon('ic_user'),
    },
    {
      title: 'training',
      path: '/dashboard/products',
      icon: icon('ic_training'),
    },
    {
      title: 'nutrition',
      path: '/login',
      icon: icon('ic_nutrition'),
    },
    {
      title: 'profile',
      path: '/404',
      icon: icon('ic_profile'),
    },
  ];
}

export default navConfig;
