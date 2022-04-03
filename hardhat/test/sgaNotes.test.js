const { expect } = require("chai");
const { ethers } = require("hardhat");

let sgaNotes;
let deployer, bob, alice;

const NOTE_URI = 'ipfs://QmPDzjNe6gN66seirdgKMsurqG3jpJpWWGGoat6gbhxz2D';

describe("SaulGoodman", function() {

  before(async function() {
    [deployer, bob, alice] = await ethers.getSigners();
    const SGA = await ethers.getContractFactory("SaulGoodmanAgreements");
    sgaNotes = await SGA.deploy();
    await sgaNotes.deployed();
  });


  it("Should mint the new note", async function() {
    await expect(sgaNotes.connect(bob).mint(NOTE_URI)).to.emit(sgaNotes, 'AgreementCreation').withArgs(
      bob.address, "0", NOTE_URI);
  });

  it("Should bond the new note to the owner", async function() {
    await expect(sgaNotes.connect(bob).transferFrom(bob.address, alice.address, 0)).to.reverted;
    await expect(sgaNotes.connect(bob).transferFrom(bob.address, ethers.constants.AddressZero, 0)).to.reverted;
  });

  it("Should be burneable only by the owner", async function() {
    await expect(sgaNotes.connect(alice).burn(0)).to.reverted;
    
    await expect(sgaNotes.connect(bob).burn(0)).to.emit(sgaNotes, 'AgreementBurn').withArgs(
      bob.address, "0", NOTE_URI);
  });
});
