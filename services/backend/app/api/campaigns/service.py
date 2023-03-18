import os
import json
import time
from datetime import datetime, timedelta
from pathlib import Path
from web3 import Web3

rpc_url="https://rpc.testnet.mantle.xyz"
contract_address="0x5776E61132C879B39e6335846cdb9F55031CC9b1"

async def create_new_campaign(owner_address: str) -> str:
    web3 = Web3(Web3.HTTPProvider(rpc_url))


    path = (
        Path(__file__).parent / "../../abis/CrowdlendFactory.json"
    )
    # create contract instance
    crowdfund_factory_abi = json.load(open(path, "r"))["abi"]
    crowdfund_factory = web3.eth.contract(contract_address, abi=crowdfund_factory_abi)

    # build transaction
    nonce = web3.eth.get_transaction_count(public_key)

    end_date = datetime.utcnow() + timedelta(minutes=1)
    unix_timestamp = int(end_date.timestamp())

    transaction = crowdfund_factory.functions.createCampaign(owner_address, mock_erc20_address, 1000, unix_timestamp).build_transaction(
    {
        "chainId": 31337,
        "gasPrice": web3.eth.gas_price,
        "from": public_key,
        "nonce": nonce,
    })

    # Sign the transaction
    signed_txn = web3.eth.account.sign_transaction(transaction, private_key=private_key)
    tx_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

    # Get the deposit_address from the receipt
    campaign_address = tx_receipt.logs[0].address

    return campaign_address


async def read_new_campaign() -> str:
    web3 = Web3(Web3.HTTPProvider(rpc_url))


    path = (
        Path(__file__).parent / "../../abis/CrowdlendFactory.json"
    )
    # create contract instance
    crowdfund_factory_abi = json.load(open(path, "r"))["abi"]
    crowdfund_factory = web3.eth.contract(contract_address, abi=crowdfund_factory_abi)

    address_list = crowdfund_factory.functions.getAllCampaigns().call()
    return address_list[len(address_list) - 1]


async def read_all_campaigns() -> str:
    web3 = Web3(Web3.HTTPProvider(rpc_url))


    path = (
        Path(__file__).parent / "../../abis/CrowdlendFactory.json"
    )
    # create contract instance
    crowdfund_factory_abi = json.load(open(path, "r"))["abi"]
    crowdfund_factory = web3.eth.contract(contract_address, abi=crowdfund_factory_abi)

    address_list = crowdfund_factory.functions.getAllCampaigns().call()
    return address_list