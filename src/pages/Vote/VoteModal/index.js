//Governance->vote中投票模型
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tabs, Modal, Form, Input, DatePicker, Button, Tooltip } from "antd";
import { SearchOutlined, InfoCircleFilled } from "@ant-design/icons";
import DatePickerReact from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

import {
  SYMBOL,
  SHORTEST_LOCK_TIME,
  INPUT_SOMETHING_TIP,
  SELECT_SOMETHING_TIP,
  INTEGER_TIP,
  BETWEEN_ZEOR_AND_BALANCE_TIP,
  FEE_TIP,
} from "@src/constants";
import {
  FROM_WALLET,
  FROM_EXPIRED_VOTES,
  FROM_ACTIVE_VOTES,
} from "@src/pages/Vote/constants";
import { thousandsCommaWithDecimal } from "@utils/formater";
import "./index.less";
import { ELF_DECIMAL } from "../constants";
import { isIPhone } from "../../../utils/deviceCheck";

const { TabPane } = Tabs;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const switchVotePagination = {
  showQuickJumper: true,
  total: 0,
  showTotal: (total) => `Total ${total} items`,
  pageSize: 3,
};

// todo: Consider to use it globally
const validateMessages = {
  // todo: Why is the fieldDecoratorId still appear?
  required: INPUT_SOMETHING_TIP,
  types: {
    email: "Not a validate email!",
    number: "Not a validate number!",
  },
  number: {
    range: "Must be between ${min} and ${max}",
  },
};

// todo: Consider to use constant in Vote instead
// todo: Consider to remove this after refactoring the component
const formItemsNeedToValidateMap = {
  fromWallet: ["lockTime", "voteAmountInput"],
  fromExpiredVotes: [],
  fromActiveVotes: ["switchVoteRowSelection"],
};

function disabledDate(current) {
  // Can not select days before today and today
  return (
    current &&
    (current < moment().add(SHORTEST_LOCK_TIME, "days").endOf("day") ||
      current > moment().add(1080, "d"))
  );
}

function getColumns() {
  const { changeVoteState } = this.props;

  return [
    {
      title: "Node Name",
      dataIndex: "name",
      key: "nodeName",
      ...this.getColumnSearchProps("name"),
      render: (text, record) => (
        // todo: consider to extract the component as a independent component
        <Tooltip title={text}>
          <Link
            to={{
              pathname: "/vote/team",
              search: `pubkey=${record.candidate}`,
            }}
            className='node-name-in-table'
            // style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
            style={{ width: 150 }}
            onClick={() => {
              changeVoteState({
                voteModalVisible: false,
              });
            }}
          >
            {text}
          </Link>
        </Tooltip>
      ),
    },
    {
      title: "Vote Amount",
      dataIndex: "amount",
      key: "voteAmount",
      sorter: (a, b) => a.amount - b.amount,
      render: (value) => value / ELF_DECIMAL,
    },
    {
      title: "Lock Time",
      dataIndex: "formatedLockTime",
      key: "lockTime",
      sorter: (a, b) => a.lockTime - b.lockTime,
    },
    {
      title: "Vote Time",
      dataIndex: "formatedVoteTime",
      key: "voteTime",
      sorter: (a, b) => a.voteTimestamp.seconds - b.voteTimestamp.seconds,
    },
  ];
}

const defaultDate = moment().add(SHORTEST_LOCK_TIME, "days").endOf("day");

class VoteModal extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    this.handleAllIn = this.handleAllIn.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.getFormItems = this.getFormItems.bind(this);

    this.state = {
      currentTab: "fromWallet", // fromActiveVotes
      formattedLockTime: null,
      datePickerTime: null,
    };
  }

  onValuesChange(_, values) {
    console.log("onValuesChange", values);
  }
  // todo: why is validateMessages didn't work when mapPropsToFields?
  // validateMessages

  getFormItems() {
    const {
      balance,
      nodeAddress,
      nodeName,
      currentWalletName,
      // handleVoteNext,
      voteAmountInput,
      lockTime,
      handleLockTimeChange,
      expiredVotesAmount,
      switchableVoteRecords,
      withdrawnableVoteRecords,
      estimatedProfit,
      switchVoteSelectedRowKeys,
      handleSwithVoteSelectedRowChange,
      voteFromExpiredVoteAmount,
      voteFromExpiredSelectedRowKeys,
      handleVoteFromExpiredSelectedRowChange,
      changeVoteState,
    } = this.props;

    const { datePickerTime } = this.state;

    const columns = getColumns.call(this);

    const voteFromExpiredRowSelection = {
      selectedRowKeys: voteFromExpiredSelectedRowKeys,
      onChange: handleVoteFromExpiredSelectedRowChange,
      hideDefaultSelections: true,
      type: "checkbox",
    };

    const switchVoteRowSelection = {
      selectedRowKeys: switchVoteSelectedRowKeys,
      onChange: (...params) => {
        handleSwithVoteSelectedRowChange(...params);
        this.setState({
          formattedLockTime: params[1][0].formatedLockTime,
        });
      },
      hideDefaultSelections: true,
      type: "radio",
    };

    const switchVoteRecord = switchableVoteRecords.find(
      (record) => record.key === switchVoteSelectedRowKeys[0]
    );
    const switchVoteAmount = switchVoteRecord && switchVoteRecord.amount;

    return [
      {
        type: FROM_WALLET,
        label: "From Wallet",
        index: 0,
        formItems: [
          {
            label: "Node Name",
            // FIXME: handle the other case
            render: (
              <span className='form-item-value'>
                {/* {centerEllipsis(nodeName)} */}
                {nodeName}
              </span>
            ),
          },
          {
            label: "Node Address",
            render: (
              <span className='form-item-value'>
                {/* {centerEllipsis(nodeAddress)} */}
                {nodeAddress}
              </span>
            ),
          },
          {
            label: "Vote Amount",
            render: (
              <Form.Item
                noStyle
                name={"voteAmountInput"}
                rules={[
                  {
                    required: true,
                    message: INPUT_SOMETHING_TIP,
                  },
                  // todo: What if I want to validate a number and return ok for the number like 1. ?
                  {
                    type: "integer",
                    transform: Number,
                    message: INTEGER_TIP,
                  },
                  {
                    type: "integer",
                    transform: Number,
                    min: 1,
                    max: Math.floor(balance),
                    message: BETWEEN_ZEOR_AND_BALANCE_TIP,
                  },
                ]}
                validateTrigger={["onChange", "onBlur"]}
                validateFirst={true} // todo: How to set it to default?
              >
                <Input className='vote-input' placeholder='Enter vote amount' />
              </Form.Item>
            ),
            // todo: extra should compatible with ReactElement and string
            tip: isIPhone()
              ? null
              : `Usable Balance: ${thousandsCommaWithDecimal(
                  balance,
                  false
                )} ${SYMBOL}`,
          },
          {
            label: "Lock Time",
            render: (
              <span
                style={{
                  position: "relative",
                }}
              >
                <Form.Item
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: SELECT_SOMETHING_TIP,
                    },
                  ]}
                  // initialValue={defaultDate}
                  name='lockTime'
                >
                  {isIPhone() ? (
                    <DatePickerReact
                      dateFormat='yyyy-MM-dd'
                      minDate={
                        new Date(moment().add(SHORTEST_LOCK_TIME + 1, "d"))
                      }
                      maxDate={new Date(moment().add(1080, "d"))}
                      showYearDropdown
                      selected={datePickerTime}
                      onChange={(date) => {
                        console.log("setFieldsValue", date);
                        this.setState({
                          datePickerTime: date,
                        });
                        this.formRef.current.setFieldsValue({
                          lockTime: moment(date),
                        });
                      }}
                      className='react-datepicker-custom-container date-picker-in-modal'
                      dayClassName={() => "day-class"}
                      includeDateIntervals={[
                        {
                          start: new Date(
                            moment().add(SHORTEST_LOCK_TIME, "d")
                          ),
                          end: new Date(moment().add(1080, "d")),
                        },
                      ]}
                      placeholderText='Select date'
                    />
                  ) : (
                    <DatePicker
                      disabledDate={disabledDate}
                      onChange={(value) => {
                        this.setState({
                          datePickerTime: new Date(value),
                        });
                        this.formRef.current.setFieldsValue({
                          lockTime: value,
                        });
                      }}
                    />
                  )}
                </Form.Item>
              </span>
            ),
            tip: isIPhone()
              ? null
              : "Withdraw and transfer are not supported during the locking period",
          },
        ],
      },
    ];
  }

  handleAllIn() {
    const { balance, changeVoteState } = this.props;

    changeVoteState({ voteAmountInput: { value: balance } });
  }

  // todo: the method seems useless
  handleOk() {
    const { callback, changeVoteState, setVoteConfirmLoading } = this.props;
    const { voteType } = this.props;
    const formItemsNeedToValidate = formItemsNeedToValidateMap[voteType];

    setVoteConfirmLoading(true);

    setTimeout(() => {
      // For old wallet app. We can not receive close event
      setVoteConfirmLoading(false);
    }, 60 * 1000);

    this.formRef.current.validateFields(formItemsNeedToValidate).then(
      (values) => {
        changeVoteState(values, () => {
          // The switch/case is for the future's product require changing.
          switch (voteType) {
            case FROM_WALLET:
              callback();
              break;
            case FROM_EXPIRED_VOTES:
              callback();
              break;
            case FROM_ACTIVE_VOTES:
              callback();
              break;
            default:
              break;
          }
        });
      },
      (err) => {
        setVoteConfirmLoading(false);
      }
    );
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type='primary'
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon='search'
          size='small'
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters, confirm)}
          size='small'
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    // render: text => (
    //   <Highlighter
    //     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //     searchWords={[this.state.searchText]}
    //     autoEscape
    //     textToHighlight={text.toString()}
    //   />
    // )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    // this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = (clearFilters, confirm) => {
    clearFilters();
    confirm();
    // this.setState({ searchText: '' });
  };

  render() {
    const {
      voteModalVisible,
      handleVoteTypeChange,
      voteType,
      voteConfirmLoading,
      isLockTimeForTest,
      changeVoteState,
    } = this.props;
    const formItems = this.getFormItems();

    const { formattedLockTime } = this.state;
    let tipHTML = <p className='tip-color'>{FEE_TIP}</p>;
    if (voteType !== "fromWallet") {
      tipHTML = (
        <>
          <p className='tip-color'>
            <div>
              Once the transfer is confirmed, your lock-up time will be reset.
              Another {formattedLockTime || "days"} will be counted from today.
            </div>
            <div>The transfer will cost 0.4301 ELF as the transaction fee.</div>
          </p>
        </>
      );
    }

    return (
      <Modal
        className='vote-modal'
        title='Node Vote'
        visible={voteModalVisible}
        onOk={this.handleOk}
        okText='OK'
        confirmLoading={voteConfirmLoading}
        width={980}
        // okText='Next'
        centered
        maskClosable
        keyboard
        destroyOnClose
        okButtonProps={{
          type: "primary",
        }}
        // todo: optimize, can I use ...this.props instead of the code on the top?
        {...this.props}
      >
        <Tabs
          defaultActiveKey={voteType}
          // Warning: Antd's tabs' activeKey can only be string type, number type will cause problem
          onChange={handleVoteTypeChange}
          activeKey={voteType}
        >
          {formItems.map((form, index) => (
            // console.log('index', form.index, index);
            // console.log('form', form);
            <TabPane
              tab={
                <span>
                  <input
                    type='radio'
                    checked={voteType === form.type}
                    value={form.type}
                    style={{ marginRight: 10 }}
                    onChange={() => {}}
                  />
                  <label htmlFor={form.label}>{form.label}</label>
                </span>
              }
              key={form.type}
            >
              <Form
                ref={this.formRef}
                className='vote-modal-form'
                {...formItemLayout}
                onSubmit={this.handleSubmit}
              >
                {form.formItems.map((item) => (
                  // todo: there are repeat code in form

                  <Form.Item
                    required={
                      item.label === "Vote Amount" || item.label === "Lock Time"
                    }
                    label={item.label}
                    key={item.label}
                    className={item.extra ? "form-item-with-extra" : ""}
                  >
                    {item.validator ? item.render || <Input /> : item.render}
                    {item.tip ? (
                      <span style={{ position: "relative" }}>
                        <Tooltip title={item.tip}>
                          <InfoCircleFilled className='right-icon' />
                        </Tooltip>
                      </span>
                    ) : null}
                  </Form.Item>
                ))}
              </Form>
            </TabPane>
          ))}
        </Tabs>
        {tipHTML}
      </Modal>
    );
  }
}

export default VoteModal;
