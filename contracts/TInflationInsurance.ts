import {
  assert,
  call,
  near,
  NearBindgen,
  NearPromise,
  UnorderedMap,
  view,
} from "near-sdk-js";

@NearBindgen({})
class TInflationInsurance {
  inflationRates = [1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n]; //default
  terms = new UnorderedMap<bigint>("map-uid-1");
  insuredValues = new UnorderedMap<bigint>("map-uid-1");
  lockPeriods = new UnorderedMap<bigint>("map-uid-1");

  totalInsured: bigint = BigInt(0);
  basepremium: bigint = 2n;
  timelock: bigint = BigInt(3600);

  @call({privateFunction:true})
  changeBasePremium(newpremium: bigint) {
    this.basepremium = newpremium;
  }

  @call({privateFunction:true})
  changeTimelock(newtimelock: bigint) {
    this.timelock = newtimelock;
  }

  @call({privateFunction:true})
  changeInflationRates(newRates: Array<bigint>) {
    this.inflationRates = newRates;
  }

  @call({})
  claim(_amount: bigint) {
    let caller = near.predecessorAccountId();
    let term = this.terms.get(caller, {
      defaultValue: BigInt(0),
    });
    
    let insuredValueLeft = this.insuredValues.get(caller, {
      defaultValue: BigInt(0),
    });
    let cooldown = this.lockPeriods.get(caller, {
      defaultValue: BigInt(0),
    });
    
    assert(cooldown! >= near.blockTimestamp(), "COOLDOWN");
    //only able to claim insurance based how much was insured
    assert(insuredValueLeft! >= _amount, "EXCEED LIMITS");
    if (insuredValueLeft == BigInt(0)) {
      this.terms.set(caller, BigInt(0));
      this.lockPeriods.set(caller, BigInt(0));
    } else {
      assert(term! >= near.blockTimestamp(), "INSURANCE EXPIRED");
      NearPromise.new(caller).transfer(_amount);
      this.totalInsured -= _amount;
      insuredValueLeft! -= _amount;
      this.insuredValues.set(caller, insuredValueLeft!);
      //cooldown for 14 days every after claim process to prevent abuse
      this.lockPeriods.set(caller, cooldown! + this.timelock);
    }
  }

  @call({ payableFunction: true })
  applyForInsurance(_value: bigint, _months: number) {
    let caller = near.predecessorAccountId();
    let timestamp = near.blockTimestamp();
    let term = this.terms.get(caller, {
      defaultValue: BigInt(0),
    });
    assert(term! == BigInt(0), "UNDER A TERM");
    let cooldown = this.lockPeriods.get(caller, {
      defaultValue: BigInt(0),
    });
    assert(cooldown! >= timestamp, "COOLDOWN");

    let premium = this.calcPremium(_value, _months);
    NearPromise.new(caller).transfer(premium);

    this.totalInsured += _value;
    this.terms.set(caller, (timestamp + BigInt(2592000)) * BigInt(_months));
    this.insuredValues.set(caller, _value);
    this.lockPeriods.set(caller, timestamp);
  }

  @view({})
  calcPremium(_value: bigint, _months: number) {
    return _value *
      (((this.inflationRates[_months - 1] + this.basepremium) * BigInt(_months)) / 100n);
  }
}
