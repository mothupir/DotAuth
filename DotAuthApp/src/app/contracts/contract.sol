// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DotAuth {

    struct User {
        address owner;
        string name;
        bool active;
        uint256 index;
    }

    struct Rule {
        address owner;
        string uuid;
        string name;
        bool active;
        uint256 index;
        User[] users;
    }

    struct Organization {
        address owner;
        string name;
        Rule[] rules;
    }

    mapping (address => Organization) private organizationsMapping;
    mapping(string => Rule) private rulesMapping;
    mapping(address => User) private usersMapping;

    constructor() payable {}

    function addOrganization(string memory _name) external payable returns(bool) {
        require(!orgExists(msg.sender), "address already registered");
        Organization storage organization = organizationsMapping[msg.sender];
        organization.owner = msg.sender;
        organization.name = _name;
        return true;
    }

    function getOrganization() external view returns(Organization memory) {
        require(orgExists(msg.sender), "organization does not exist");
        return organizationsMapping[msg.sender];
    }

    function addRule(string memory _uuid, string memory _name) external payable returns(bool) {
        require(orgExists(msg.sender), "organization does not exist");
        Rule storage rule = rulesMapping[_uuid];
        rule.owner = msg.sender;
        rule.uuid = _uuid;
        rule.name = _name;
        rule.active = true;
        rule.index = organizationsMapping[msg.sender].rules.length;
        organizationsMapping[msg.sender].rules.push(rule);
        return true;
    }

    function getRules() external view returns(Rule[] memory) {
        require(orgExists(msg.sender), "organization does not exist");
        return organizationsMapping[msg.sender].rules;
    }

    function removeRule(string memory _uuid, uint8 ruleIndex) external returns(bool) {
        require(orgExists(msg.sender), "organization does not exist");
        require(ruleExists(_uuid), "access rule does not exist");
        organizationsMapping[msg.sender].rules[ruleIndex].active = false;
        return true;
    }

    function addUser(address _owner, string memory _name, string memory _uuid, uint256 ruleIndex) external payable returns(bool) {
        require(orgExists(msg.sender), "organization does not exist");
        require(ruleExists(_uuid), "access rule does not exist");
        User storage user = usersMapping[msg.sender];
        user.owner = _owner;
        user.name = _name;
        user.active = true;
        user.index = organizationsMapping[msg.sender].rules[ruleIndex].users.length;
        organizationsMapping[msg.sender].rules[ruleIndex].users.push(user);
        return true;
    }

    function assign(string memory _uuid, uint256 ruleIndex, uint256 userIndex) external payable returns(bool) {
        require(orgExists(msg.sender), "organization does not exist");
        require(ruleExists(_uuid), "access rule does not exist");
        if(organizationsMapping[msg.sender].rules[ruleIndex].users[userIndex].active == true) {
            organizationsMapping[msg.sender].rules[ruleIndex].users[userIndex].active = false;
        } else {
            organizationsMapping[msg.sender].rules[ruleIndex].users[userIndex].active = true;
        }
        return true;
    }

    function authorize(address _org) external view returns(bool) {
        if(organizationsMapping[_org].owner != _org) {
            return false;
        }

        for(uint256 i; i < organizationsMapping[_org].rules.length; i++) {
            for(uint256 j; j < organizationsMapping[_org].rules[i].users.length; j++) {
                if((organizationsMapping[_org].rules[i].users[j].owner == msg.sender) && organizationsMapping[_org].rules[i].users[j].active) {
                    return true;
                }
            }
        }
        return false;
    }

    function orgExists(address owner) internal view returns (bool) {
        if(organizationsMapping[msg.sender].owner == owner) {
            return true;
        }
        return false;
    }

    function ruleExists(string memory uuid) internal view returns(bool) {
        if(keccak256(abi.encodePacked(rulesMapping[uuid].uuid)) == keccak256(abi.encodePacked(uuid))) {
            return true;
        }
        return false;
    }
}