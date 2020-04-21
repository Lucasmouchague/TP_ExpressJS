'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('failles', [{
      name: 'CVE-2019-0708',
      type: 'RCE',
      score: '10.0',
      description: 'This module checks a range of hosts for the CVE-2019-0708 vulnerability by binding the MS_T120 channel outside of its normal slot and sending non-DoS packets which respond differently on patched and vulnerable hosts. It can optionally trigger the DoS vulnerability.',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      name: 'CVE-2017-0143',
      type: 'RCE',
      score: '9.3',
      description: "This module executes a Metasploit payload against the Equation Group's DOUBLEPULSAR implant for SMB as popularly deployed by ETERNALBLUE. While this module primarily performs code execution against the implant, the 'Neutralize implant' target allows you to disable the implant.",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      name: 'CVE-2019-17510',
      type: 'RCE',
      score: '10.0',
      description: 'There are remote RCE vulnerabilities in D-Link router due to invalid sanitization so attackers could execute arbitrary code. Vulnerable targets include but are not limited to the lastest firmware versions of DIR-846(100A35)',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

