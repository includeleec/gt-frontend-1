import { Card, Col, Divider, Icon, Input, Row, Spin } from 'antd';
import React, { PureComponent } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import Link from 'umi/link';
import { connect } from 'dva';
import Projects from './components/Projects';
import styles from './style.less';
import ProposalList from './components/ProposalList';
import UserAvatar from '@/components/User/UserAvatar';

@connect(({ loading, user }) => ({
  userDetail: user.userDetail,
  userDetailLoading: loading.effects['user/fetchUserDetail'],
  // currentUser: user.currentUser,
  // currentUserLoading: loading.effects['user/fetchCurrent'],
}))
class AccountCenter extends PureComponent {
  // static getDerivedStateFromProps(
  //   props: userAndAccountCenterProps,
  //   state: userAndAccountCenterState,
  // ) {
  //   const { match, location } = props;
  //   const { tabKey } = state;
  //   const path = match && match.path;
  //   const urlTabKey = location.pathname.replace(`${path}/`, '');
  //   if (urlTabKey && urlTabKey !== '/' && tabKey !== urlTabKey) {
  //     return {
  //       tabKey: urlTabKey,
  //     };
  //   }
  //   return null;
  // }
  state = {
    tabKey: 'create',
  };

  input = undefined;

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'user/fetchUserDetail',
      payload: match.params,
    });
  }

  onTabChange = key => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key,
    });
  };

  renderChildrenByTabKey = tabKey => {
    const { userDetail, userDetailLoading } = this.props;
    let list;
    if (tabKey === 'create') {
      list = userDetail.proposals_created;
    }

    return (<Spin spinning={userDetailLoading}>
        <ProposalList list={list} />
    </Spin>);
  };

  render() {
    const { tabKey } = this.state;
    const { userDetail, userDetailLoading } = this.props;
    const dataLoading = userDetailLoading || !(userDetail && Object.keys(userDetail).length);

    const operationTabList = () => [
      {
        key: 'create',
        tab: `创建的提案(${
          userDetail.proposals_created ? userDetail.proposals_created.length : ''
        })`,
      },
    ];

    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card
              bordered={false}
              style={{
                marginBottom: 24,
              }}
              loading={dataLoading}
            >
              {!dataLoading && (
                <div>
                  <div className={styles.avatarHolder}>
                    <UserAvatar size={100} {...userDetail} />
                    <div className={styles.name}>用户名：{userDetail.username}</div>
                    {userDetail.nickname && (
                      <div className={styles.nickname}>昵称：{userDetail.nickname}</div>
                    )}
                    {userDetail.sign && (
                      <div className={styles.sign}>
                        <p>{userDetail.sign}</p>
                      </div>
                    )}
                  </div>
                  {/* <div className={styles.detail}>
                  </div> */}
                </div>
              )}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList()}
              activeTabKey={tabKey}
              onTabChange={this.onTabChange}
            >
              {this.renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default AccountCenter;
