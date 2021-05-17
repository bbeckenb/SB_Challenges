describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
    //tipAmtInput.value = 30;
    allServers = {server1: 'Alice', server2: 'Tomas', server3: 'Bri'};
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(3);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should create a new row for each server in object allServers on updateServerTable()', function() {
    updateServerTable();
    
    expect(serverTbody.rows.length).toEqual(3); //all keys from allServers have been established as table rows
  })

  afterEach(function() {
    console.log(allServers);
    console.log(serverId);
    serverNameInput.value = '';
    allServers = {}; //clears object
    let rows = serverTbody.querySelectorAll('tr'); //scalable, if you add more servers
    console.log(rows);
    for (let row of rows) {
      row.remove()
    }
    //console.log(rows);
  });
});
