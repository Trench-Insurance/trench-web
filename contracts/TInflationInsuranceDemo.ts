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
class TInflationInsuranceDemo {
  inflationRates: Array<bigint> = [125n, 422n, 534n, 634n, 255n, 821n, 911n, 312n, 433n, 544n, 633n, 722n];
  inflationToday: bigint = 146n;
  terms = new UnorderedMap<bigint>("map-terms");
  insuredValues = new UnorderedMap<bigint>("map-values");
  lockPeriods = new UnorderedMap<bigint>("map-locks");

  totalInsured: bigint = BigInt(0);
  basepremium: bigint = 275n;
  timelock: bigint = BigInt(3600);

  @call({})
  changeBasePremium(newpremium: number) {
    this.basepremium = BigInt(newpremium);
  }

  @call({})
  changeInflationRates(newRates: Array<number>) {
    const arr = newRates.map((i) => BigInt(i))
    this.inflationRates = arr;
  }

  @call({})
  changeTimelock(newtimelock: number) {
    this.timelock = BigInt(newtimelock);
  }

  @call({})
  changeInflationToday(newInflation: number) {
    this.inflationToday = BigInt(newInflation);
  }

  @call({})
  claim({_amount}) {
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
    assert(this.inflationToday > 400n, "Inflation is normal");
    assert(cooldown! <= near.blockTimestamp(), "COOLDOWN");
    //only able to claim insurance based how much was insured
    assert(insuredValueLeft! >= BigInt(_amount), "EXCEED LIMITS");
    if (insuredValueLeft == BigInt(0)) {
      this.terms.set(caller, BigInt(0));
      this.lockPeriods.set(caller, BigInt(0));
    } else {
      assert(term! >= near.blockTimestamp(), "INSURANCE EXPIRED");
      NearPromise.new(caller).transfer(BigInt(_amount));
      this.totalInsured -= BigInt(_amount);
      insuredValueLeft! -= BigInt(_amount);
      this.insuredValues.set(caller, insuredValueLeft!);
      //cooldown for 14 days every after claim process to prevent abuse
      this.lockPeriods.set(caller, cooldown! + this.timelock);
    }
  }

  @call({ payableFunction: true })
  applyForInsurance({_value, _months}) {
    let caller = near.predecessorAccountId();
    let timestamp = near.blockTimestamp();
    let term = this.terms.get(caller, {
      defaultValue: BigInt(0),
    });
    assert(term! == BigInt(0), "UNDER A TERM");
    let cooldown = this.lockPeriods.get(caller, {
      defaultValue: BigInt(0),
    });
    assert(cooldown! == BigInt(0), "COOLDOWN");

    let premium = this.calcPremium({value: _value, month: _months});
    NearPromise.new(caller).transfer(premium);

    this.totalInsured += BigInt(_value);
    this.terms.set(caller, (timestamp + BigInt(2592000)) * BigInt(_months));
    this.insuredValues.set(caller, BigInt(_value));
    this.lockPeriods.set(caller, timestamp);
  }

  @view({})
  calcPremium({value, month}) {
    let res = value *
    ((Number(this.inflationRates[month - 1])/100 + Number(this.basepremium) / 100) / 100 * month);
    return BigInt(res);
  }

  @view({})
  getTotalInsured(): bigint {
    return this.totalInsured;
  }

  @view({})
  getBasePremiumRate() {
    return this.basepremium;
  }

  @view({})
  getInflationToday() {
    return this.inflationToday;
  }

  @view({})
  getInflationRates() {
    return this.inflationRates;
  }

  @view({})
  getInsuredAmount({caller}) {
    return this.insuredValues.get(caller, {
      defaultValue: BigInt(0),
    });
  }

  @view({})
  getCooldown({caller}) {
    return this.lockPeriods.get(caller, {
      defaultValue: BigInt(0),
    });
  }
}
