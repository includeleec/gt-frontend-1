import React from 'react';
import { Card, Typography, Tag } from 'antd';
import Link from 'umi/link';
import btc_cover from '@/assets/card/btc.png';
import styles from './style.less';
import UserAvatar from '@/components/User/UserAvatar';

const { Title, Text } = Typography;

const Cover = () => (
  <div className={styles.cardCover} style={{ backgroundImage: `url(${btc_cover})` }}>
    <Typography>
      <Title className={styles.titleNo}>No.101</Title>
    </Typography>
  </div>
);

const Zone = props => (
  <div className={styles.container}>
    <Link to="/proposal/detail">
      <Card className={styles.card} hoverable cover={<Cover />}>
        <Typography>
          <div className={styles.cardHead}>
            <div className="left">
              <Text>Token Name No.111</Text>
            </div>
            <div className="right">
              <Tag color="#2db7f5">1000 ETH</Tag>
            </div>
          </div>
          <h3 className={styles.proposalTitle}>proposal title ......</h3>
          <Text>
            proposal summary proposal summaryproposal summaryproposal summaryproposal summary ...
          </Text>
          {/* <div className={styles.creator}>
            <Avatar />
            <Text className={styles.byCreator}>By username</Text>
          </div> */}
        </Typography>
      </Card>
    </Link>
  </div>
);

export default Zone;
