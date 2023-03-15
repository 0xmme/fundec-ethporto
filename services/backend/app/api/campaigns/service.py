import os
import json
import time
from datetime import datetime, timedelta
from pathlib import Path
from web3 import Web3

async def create_new_campaign(owner_address: str) -> str:
    web3 = Web3(Web3.HTTPProvider("http://evm-contracts:8545"))
    contaract_address="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

    path = (
        Path(__file__).parent / "./abis/CrowdfundFactory.json"
    )
    crowdfund_factory_abi = json.load(open(path, "r"))["abi"]

    crowdfund_factory = web3.eth.contract(contaract_address,abi=crowdfund_factory_abi)

    nonce = web3.eth.get_transaction_count("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")

    end_date = datetime.utcnow() + timedelta(minutes=1)
    unix_timestamp = int(end_date.timestamp())

    # Submit the transaction that launches a crowdfunding campaign
    tx_hash = crowdfund_factory.functions.createCampaign('0x5FbDB2315678afecb367f032d93F642f64180aa3', 1000, unix_timestamp).build_transact(
    {
        "chainId": 1337,
        "gasPrice": web3.eth.gas_price,
        "from": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        "nonce": nonce,
    })

    return tx_hash