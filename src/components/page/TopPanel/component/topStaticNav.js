import React from 'react';
import { MagentoStaticLink } from 'src/components/ui/index';

const topStaticNav = () => {
  const nav = [
    { id: 'global.magento.topNav.home', href: '/home' },
    { id: 'global.magento.topNav.contactUs', href: '/contact' },
  ];
  return (<ul> {nav.map((item, index) => <MagentoStaticLink key={index} href={item.href} titleId={item.id} />)}</ul>);
};

export default topStaticNav;
