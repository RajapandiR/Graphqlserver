class CategorySchema {
  
  static addCategory() {
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

  static editCategory() {
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

export default CategorySchema;
