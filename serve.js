const { Client } = require('ldapts');

const url = "ldap://192.168.3.250";
const bindDN = "CN=sawangpong,OU=mmc,OU=Project,DC=mrta,DC=co,DC=th";
const password = '1234P@ssw0rd';
const searchDN = "OU=mmc,OU=Project,DC=mrta,DC=co,DC=th";

const client = new Client({
	  url,
});

let isAuthenticated;

async function checkAuth () {
	try {
		  await client.bind(bindDN, password);
		  isAuthenticated = true;
			console.log(isAuthenticated);
	} catch (ex) {
		  isAuthenticated = false;
			console.log(isAuthenticated);
	} finally {
		  await client.unbind();
	}
}


async function searchUser () {
	try {
	  await client.bind(bindDN, password);
	  const {
	    searchEntries,
	    searchReferences,
	  } = await client.search(searchDN, {
	    scope: 'sub',
	    filter: "(&(objectClass=person)(objectClass=user))",
	  });
    console.log(searchEntries);
	} catch (ex) {
	  throw ex;
	} finally {
	  await client.unbind();
	}
}

//checkAuth();
searchUser();
