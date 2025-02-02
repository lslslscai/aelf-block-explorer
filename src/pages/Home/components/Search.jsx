import { Button, Input } from "antd";
import React, { useState, useCallback } from "react";
import IconFont from "../../../components/IconFont";
import { withRouter } from "../../../routes/utils";
import { getHandleSearch } from "../../../utils/search";

// 搜索栏
function Search(props) {
  const [value, setValue] = useState("");
  const { navigate } = props;

  const handleSearch = getHandleSearch(navigate, value);

  const handleInput = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <div className="new-search">
      <Input
        value={value}
        placeholder="Search by Address / Txn Hash / Block"
        onChange={handleInput}
        onPressEnter={handleSearch}
      />
      <Button type="primary" onClick={handleSearch}>
        <IconFont type="Search" />
      </Button>
    </div>
  );
}

export default withRouter(Search);
