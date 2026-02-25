export interface ProductProps {
  id: string;
  sku: string;
  name: string;
  description?: string | null;
  price: number;        
  costPrice?: number | null;
  currency: string;
  isActive: boolean;
  createdBy: string;
  updatedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Product {
  private props: ProductProps;

  constructor(props: ProductProps) {
    this.props = props;
  }

 
  get id() { return this.props.id; }
  get sku() { return this.props.sku; }
  get name() { return this.props.name; }
  get description() { return this.props.description; }
  get price() { return this.props.price; }
  get costPrice() { return this.props.costPrice; }
  get currency() { return this.props.currency; }
  get isActive() { return this.props.isActive; }
  get createdBy() { return this.props.createdBy; }
  get updatedBy() { return this.props.updatedBy; }
  get createdAt() { return this.props.createdAt; }
  get updatedAt() { return this.props.updatedAt; }

  
  deactivate() {
    this.props.isActive = false;
  }

  activate() {
    this.props.isActive = true;
  }

  updatePrice(newPrice: number) {
    if (newPrice <= 0) {
      throw new Error("Price must be greater than zero");
    }
    this.props.price = newPrice;
  }
}