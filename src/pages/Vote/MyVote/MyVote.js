import React, { Component } from 'react';
import moment from 'moment';

import StatisticalData from '@components/StatisticalData/';
import { myVoteStatisData } from '../constants';
import MyVoteRecord from './MyVoteRecords';
import { getAllTeamDesc, fetchPageableCandidateInformation } from '@api/vote';
import getCurrentWallet from '@utils/getCurrentWallet';
import {
  NODE_DEFAULT_NAME,
  RANK_NOT_EXISTED_SYMBOL
} from '@src/pages/Vote/constants';

export default class MyVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statisData: myVoteStatisData,
      tableData: []
    };
  }

  componentDidMount() {
    this.fetchTableDataAndStatisData();
  }

  // componentDidUpdate(prevProps, prevState) {

  //   this.fetchTableDataAndStatisData();
  // }

  fetchTableDataAndStatisData() {
    const { electionContract } = this.props;
    const currentWallet = getCurrentWallet();

    // todo: is it ok to get the same data twice in different tabs
    // todo: add error handle
    Promise.all([
      electionContract.GetElectorVoteWithAllRecords.call({
        value: currentWallet.pubKey
      }),
      getAllTeamDesc(),
      fetchPageableCandidateInformation(electionContract, {
        start: 0,
        length: 5 // FIXME:
      })
    ]).then(resArr => {
      console.log('resArr', resArr);
      this.processData(resArr);
    });
  }

  processData(resArr) {
    const electorVotes = resArr[0];
    const allNodeInfo = resArr[2].value
      .sort((a, b) => +b.obtainedVotesAmount - +a.obtainedVotesAmount)
      .map((item, index) => {
        item.rank = index + 1;
        return item;
      });
    let allTeamInfo = null;
    if (resArr[1].code === 0) {
      allTeamInfo = resArr[1].data;
    }

    const myVoteRecords = [
      ...electorVotes.activeVotingRecords,
      ...electorVotes.withdrawnVotesRecords
    ];
    // assign rank
    myVoteRecords.forEach(record => {
      const foundedNode = allNodeInfo.find(
        item => item.candidateInformation.pubkey === record.candidate
      );
      if (foundedNode === undefined) {
        // rank: used to sort
        record.rank = 9999999;
        // displayedRank: used to display
        record.displayedRank = RANK_NOT_EXISTED_SYMBOL;
      } else {
        record.rank = foundedNode.rank;
        record.displayedRank = foundedNode.rank;
      }
    });
    const myTotalVotesAmount = electorVotes.allVotedVotesAmount;
    this.processStatisData('myTotalVotesAmount', 'num', myTotalVotesAmount);
    this.processTableData(myVoteRecords, allTeamInfo);
  }

  // eslint-disable-next-line class-methods-use-this
  processTableData(myVoteRecords, allTeamInfo) {
    // add node name
    const tableData = myVoteRecords;
    tableData.forEach(record => {
      const teamInfo = allTeamInfo.find(
        team => team.public_key === record.candidate
      );
      console.log('teamInfo', teamInfo);
      if (teamInfo === undefined) {
        record.name = record.candidate;
      } else {
        record.name = teamInfo.name;
      }
      if (record.isWithdrawn) {
        record.type = 'Redeem';
        record.operationTime = moment
          .unix(record.withdrawTimestamp.seconds)
          .format('YYYY-MM-DD HH:mm:ss');
      } else {
        record.type = 'Vote';
        record.operationTime = moment
          .unix(record.voteTimestamp.seconds)
          .format('YYYY-MM-DD HH:mm:ss');
      }
      record.status = 'Success';
      console.log('record.lockTime', record.lockTime);
      const start = moment.unix(record.voteTimestamp.seconds);
      const end = moment.unix(record.unlockTimestamp.seconds);
      record.formatedLockTime = end.from(start, true);
    });
    // todo: withdrawn's timestamp

    this.setState({
      tableData
    });
  }

  processStatisData(key, param, value) {
    let { statisData } = this.state;
    statisData[key][param] = value;
    // todo: Is it required?
    statisData = { ...statisData };
    this.setState({
      statisData
    });
  }

  render() {
    const { statisData, tableData } = this.state;

    return (
      <section className='page-container'>
        <StatisticalData data={statisData} />
        <MyVoteRecord data={tableData} />
      </section>
    );
  }
}