/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Menu } from 'antd';
import classNames from 'classnames/bind';
import { MagentoStaticLink } from 'components/ui/index';
import { getAbsolutePath } from 'config/magento.config';
import styles from '../HeaderNav.less';

const cx = classNames.bind(styles);
const { SubMenu } = Menu;
const navView = ({ language, intl }) => {
  const category = [{
    titleId: 'mubaki',
    url: '/mum-baby.html',
    children: [{
      titleId: 'info',
      url: '/mum-baby/mum-baby-baby-formula.html',
    }, {
      titleId: 'hegr',
      url: '/mum-baby/mum-baby-baby-medical-vimtamins.html',
    }, {
      titleId: 'prbrca',
      url: '/mum-baby/mum-baby-baby-care-products.html',
    }, {
      titleId: 'mepe',
      url: '/mum-baby/mental-performance.html',
    }],
  },
  {
    titleId: 'visu',
    url: '/supplements.html',
    children: [{
      titleId: 'vi',
      url: '/supplements/vitamins-minerals.html',
    }, {
      titleId: 'mi',
      url: '/supplements/probiotics-prebiotics.html',
    }, {
      titleId: 'fioi',
      url: '/supplements/fish-oil.html',
    }, {
      titleId: 'gehe',
      url: '/supplements/general-health.html',
    }],
  },
  {
    titleId: 'nahepr',
    url: '/natural-health-products.html',
    children: [{
      titleId: 'bohe',
      url: '/natural-health-products/bone-joint-support.html',
    }, {
      titleId: 'hehe',
      url: '/natural-health-products/heart-health.html',
    }, {
      titleId: 'anan',
      url: '/natural-health-products/antioxidant.html',
    }, {
      titleId: 'slsu',
      url: '/natural-health-products/sleep-support.html',
    }, {
      titleId: 'gehe2',
      url: '/natural-health-products/general-health.html',
    }, {
      titleId: 'bepr',
      url: '/natural-health-products/bee-products.html',
    }],
  },
  {
    titleId: 'wohe',
    url: '/for-women.html',
    children: [{
      titleId: 'memeca',
      url: '/for-women/pregnancy.html',
    }, {
      titleId: 'vienbo',
      url: '/for-women/vitality-support.html',
    }, {
      titleId: 'resehe',
      url: '/for-women/urinary-tract-health.html',
    }, {
      titleId: 'gehe3',
      url: '/for-women/stress-relief.html',
    }],
  },
  {
    titleId: 'mehe',
    url: '/for-men.html',
    children: [{
      titleId: 'vienbo2',
      url: '/for-men/performance-boost.html',
    }, {
      titleId: 'prca',
      url: '/for-men/prostate-health.html',
    }, {
      titleId: 'resehe2',
      url: '/for-men/sexual-health.html',
    }, {
      titleId: 'gehe4',
      url: '/for-men/general-health.html',
    }],
  },
  {
    titleId: 'bepeca',
    url: '/makeup.html',
    children: [{
      titleId: 'skhaca',
      url: '/makeup/skin-care.html',
    }, {
      titleId: 'eyfali',
      url: '/makeup/makeup-face.html',
    }, {
      titleId: 'habo',
      url: '/makeup/skin-care-hand-body.html',
    }, {
      titleId: 'orca',
      url: '/makeup/makeup-lip.html',
    }],
  },
  {
    titleId: 'welo',
    url: '/weight-lost.html',
    children: [{
      titleId: 'difipr',
      url: '/weight-lost/dietary-fibre-and-prebiotics.html',
    }, {
      titleId: 'mere',
      url: '/weight-lost/meal-replacement.html',
    }, {
      titleId: 'fabusu',
      url: '/weight-lost/weight-loss-supplements.html',
    }],
  },
  {
    titleId: 'nufodaes',
    url: '/nutritional-foods-and-daily-essentials.html',
    children: [{
      titleId: 'nufo',
      url: '/nutritional-foods-and-daily-essentials/nutritional-foods.html',
    }, {
      titleId: 'daes',
      url: '/nutritional-foods-and-daily-essentials/daily-essentials.html',
    }],
  },
  ];

  const { formatMessage } = intl;
  const goToSubmenu = (href) => {
    window.location.href = getAbsolutePath(href, language);
  };
  const getChildrenTree = (item) => {
    if (item.children && item.children.length > 0) {
      return (
        <SubMenu
          title={formatMessage({id: `global.magento.headerNav.${item.titleId}` })}
          key={item.url}
          onTitleClick={({ key }) => { goToSubmenu(key); }}
        >
          { item.children.map(cItem => getChildrenTree(cItem))}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.url}>
        <MagentoStaticLink titleId={`global.magento.headerNav.${item.titleId}`} href={item.url} />
      </Menu.Item>);
  };
  return (
    <Menu mode="horizontal" className={cx('nav')}>
      {
        category.map(item => getChildrenTree(item))
      }
    </Menu>
  );
};


navView.propTypes = {
  language: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};


export default injectIntl(navView);
