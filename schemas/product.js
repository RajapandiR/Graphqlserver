class ProductSchema {
  
    static addProduct() {
      return {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          displayed: { type: 'string' },
        },
        required: ['name']
      };
    }
  
    static editProduct() {
      return {
        type: 'object',
        properties: {
          id: {type: 'string'},
          name: { type: 'string'},
          description: { type: 'string'},
          displayed: { type: 'string' },
        },
        required: ['id']
      };
    }
  }
  
  export default ProductSchema;
  