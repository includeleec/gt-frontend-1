import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva';
import styles from './style.less';

const { TextArea } = Input;

const CommentForm = props => {
  const { getFieldDecorator, getFieldsError, resetFields } = props.form;
  const { submittingCreate } = props;

  const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field]);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);

        const { dispatch, proposalDetail } = props;
        dispatch({
          type: 'comment/createComment',
          payload: { ...values, proposal_id: proposalDetail.id },
        });

        // clear input value
        resetFields();
      }
    });
  };

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator('text', {
            rules: [{ required: true, message: '请输入评论内容' }],
          })(<TextArea rows={4} />)}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError()) || submittingCreate}
          >
            发表评论
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const CommentFormWrapper = Form.create({ name: 'comment_form' })(CommentForm);
export default connect(({ proposal, loading }) => ({
  proposalDetail: proposal.detail,
  submittingCreate: loading.effects['comment/createComment'],
  submittingUpdate: loading.effects['comment/updateComment'],
}))(CommentFormWrapper);