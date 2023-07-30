// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig =  (user) => {
  return [
    {
      title: 'meetings',
      path: '/dashboard/app',
      icon: icon('ic_meeting'),
    },
    {
      title: user?.isTrainer ? 'my trainees' : 'my trainer',
      path: '/dashboard/user',
      icon:  user?.isTrainer ? icon('ic_users') : icon('ic_user'),
    },
    {
      title: 'training',
      path: '/dashboard/products',
      icon: icon('ic_training'),
    },
    {
      title: 'messenger',
      path: '/dashboard/blog',
      icon: icon('ic_messenger'),
    },
    {
      title: 'nutrition',
      path: '/dashboard/nutrition',
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
