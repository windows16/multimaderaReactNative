import { Redirect } from 'expo-router';

import AppTabs from '@/components/app-tabs';
import { useAppSelector } from '@/store/hooks';

export default function TabsLayout() {
  const user = useAppSelector((state) => state.auth.user);
  if (!user) return <Redirect href="../login" />;

  return <AppTabs />;
}
