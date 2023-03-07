import { Button, Modal, Row, Space, Typography } from "antd";
import { FC, ReactNode, useState } from "react";
import AntTable from "../../Common/AntTable";

type ModalProps = {
  title: string;
  modalProps: any;
  filterColumns: any[];
  visible: boolean;
  submitHandler: (values: any) => void;
  cancelHandler: () => void;
  clearAllHandler: () => void;
};

type BtnProps = {
  color: string;
  bgColor: string;
  onClick?: () => void;
  children: ReactNode;
};

const { Title } = Typography;

const CustomBtn: FC<BtnProps> = ({ onClick, color, bgColor, children }) => (
  <Button
    style={{
      color,
      backgroundColor: bgColor,
      border: "none",
      borderRadius: 4,
    }}
    onClick={onClick}
  >
    {children}
  </Button>
);

const FilterModal: FC<ModalProps> = ({
  title,
  visible,
  modalProps,
  filterColumns,
  submitHandler,
  clearAllHandler,
  cancelHandler,
}) => {
  const [filterValues, setFilterValues] = useState<any[]>([]);

  const rowSelection = {
    selectedRowKeys: filterValues,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setFilterValues(selectedRowKeys)
    },
  };

  return (
    <Modal
      visible={visible}
      bodyStyle={{ borderRadius: 20 }}
      closable={false}
      footer={null}
      className="filter-modal"
    >
      <Title level={5}>{title}</Title>
      <AntTable
        dataSource={modalProps.filters}
        columns={filterColumns}
        rowSelection={rowSelection}
        rowKey={(record: any) => record.text}
        pagination={false}
        size="small"
      />
      <Row justify="end">
        <Space style={{ marginTop: 20 }}>
          <CustomBtn
            bgColor="#e0e0e0"
            color="#111"
            onClick={() => {
              cancelHandler();
              setFilterValues([]);
            }}
          >
            Cancel
          </CustomBtn>
          <CustomBtn
            bgColor="#e0e0e0"
            color="#111"
            onClick={() => {
              clearAllHandler();
              setFilterValues([]);
            }}
          >
            Clear all
          </CustomBtn>
          <CustomBtn
            bgColor="#00c853"
            color="#fff"
            onClick={() => submitHandler(filterValues)}
          >
            Submit
          </CustomBtn>
        </Space>
      </Row>
    </Modal>
  );
};

export default FilterModal;
