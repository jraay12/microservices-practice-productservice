export interface StockProps {
  id: string;
  productId: string;
  quantity: number;
  minStockLevel: number;
  updatedAt: Date;
}

export class Stock {
  private props: StockProps;

  constructor(props: StockProps) {
    this.props = props;
  }

  get id() { return this.props.id; }
  get productId() { return this.props.productId; }
  get quantity() { return this.props.quantity; }
  get minStockLevel() { return this.props.minStockLevel; }
  get updatedAt() { return this.props.updatedAt; }

  add(quantity: number) {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }
    this.props.quantity += quantity;
  }

  deduct(quantity: number) {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

    if (this.props.quantity < quantity) {
      throw new Error("Insufficient stock");
    }

    this.props.quantity -= quantity;
  }

  isLowStock(): boolean {
    return this.props.quantity <= this.props.minStockLevel;
  }
}