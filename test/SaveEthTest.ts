import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SaveEth", function () {
  async function deploySaveEth() {
   
    const [owner, otherAccount] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();

    const SaveEth = await ethers.getContractFactory("SaveEth");
    const saveEth = await SaveEth.deploy(myToken.target);

    return { saveEth, owner, myToken, otherAccount };
  };

  // Testing for all zero addresses in the contract
  describe("test address zero", async () => {
    it("check against address 0", async () => {
      const { owner } = await loadFixture(deploySaveEth);
      expect(owner).not.equals(ethers.ZeroAddress);
    })
  })
 describe("deposit", async () => {
  it("test deposit amount", async () => {
    const {myToken, owner} = await loadFixture(deploySaveEth)
    expect(await myToken.balanceOf(owner.address)).is.not.eq(0) 
  })
 } )
 
 describe("approval", async () => {
  it("check approval ", async () => {
    const {myToken, owner, saveEth} = await loadFixture(deploySaveEth)
    const amount = 10
    await myToken.approve(saveEth.target, amount);
    await saveEth.deposit(amount);
    await expect (saveEth.deposit(amount))
    .to.emit(saveEth, 'SavingSuccessful')
     .withArgs(
       owner.address,
       amount);
  })
 })
});


