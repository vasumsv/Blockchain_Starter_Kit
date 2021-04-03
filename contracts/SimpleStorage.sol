pragma solidity ^0.4.24;

contract SimpleStorage {
  string data;

  function set(string x) public {
    data = x;
  }

  function get() public view returns (string) {
    return data;
  }
}
