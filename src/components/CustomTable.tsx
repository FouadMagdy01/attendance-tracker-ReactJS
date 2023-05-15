import { Table } from "antd";
import React from "react";

interface SafqaTableProps {
  dataSource?: any[];
  loading?: boolean;
  columns?: any[];
  pageSize?: number;
  rowKey?: any;
  tableConfigProps?: any;
}

const CustomTable: React.FC<SafqaTableProps> = ({
  dataSource,
  loading,
  columns,
  pageSize,
  tableConfigProps,
  rowKey,
}) => {
  return (
    <Table
      pagination={{
        position: ["bottomRight"],
        pageSize: pageSize,
      }}
      rowKey={rowKey}
      loading={loading}
      dataSource={dataSource}
      columns={columns}
      {...tableConfigProps}
    />
  );
};

export default CustomTable;
