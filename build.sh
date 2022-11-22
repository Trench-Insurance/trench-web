#!/bin/sh

echo ">> Building contract"

near-sdk-js build ./contracts/TInflationInsuranceDemo.ts buildcontract/TInflationInsuranceDemo.wasm
