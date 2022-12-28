import * as bcrypt from 'bcrypt';

export class Password {
  private saltOfRounds = 10;
  public password: string; // incoming password string
  public toBeCompare: string; // for verify a password hash

  constructor(password: string, compare?: string) {
    this.password = password; // storing given pwd in this property
    if (compare) {
      this.toBeCompare = compare; // to be verify
    } else {
      this.toBeCompare = '';
    }
  }

  // for hashing a password
  public async hash(): Promise<string> {
    // returning a new pwd @string hashed by bcrypt
    return await bcrypt.hash(this.password, this.saltOfRounds);
  }

  // for compare or verify a password
  public async verify(): Promise<boolean> {
    return await bcrypt.compare(this.password, this.toBeCompare);
  }
}
